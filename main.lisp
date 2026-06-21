(in-package #:website)
(setf spinneret:*html-style* :tree)

(defparameter *dev-mode* nil)
(defparameter *cv* (bt:make-condition-variable))
(defparameter *lock* (bt:make-lock))
(defparameter *files-changed* nil)

(defun build-all-pages ()
  (build-content-pages)
  (build-non-content-pages))

(defun build ()
  (build-all-pages))

(defun dev ()
  (setf *dev-mode* t)
  (build-all-pages)
  (watch-file-changes
   *root-dir*
   *watch-interval*
   (lambda ()
     (build-all-pages)
      (bt:with-lock-held (*lock*)
        (setf *files-changed* t)
        (bt:condition-notify *cv*))))
  (hunchentoot:start
   (make-instance 'hunchentoot:easy-acceptor
                  :port 8080
                  :document-root #p "docs/")))

(push (hunchentoot:create-folder-dispatcher-and-handler "/development/" "development/")
      hunchentoot:*dispatch-table*)

(push (hunchentoot:create-prefix-dispatcher "/stream" 'sse-handler)
      hunchentoot:*dispatch-table*)

(defun sse-handler ()
  (setf (hunchentoot:content-type*) "text/event-stream")
  (setf (hunchentoot:header-out "Cache-Control") "no-cache")
  (setf (hunchentoot:reply-external-format*) :utf-8)
  (setf (hunchentoot:header-out "Transfer-Encoding") "identity")
  (let* ((raw (hunchentoot:send-headers))
         (stream (flexi-streams:make-flexi-stream raw :external-format :utf-8)))
    (format stream ": keepalive~%~%")
    (force-output stream)
    (handler-case
        (loop
          (bt:with-lock-held (*lock*)
            (loop until *files-changed*
                  do (bt:condition-wait *cv* *lock*)))
          (format t "SSE: sending event~%")
          (format stream "data: changed~%~%")
          (force-output stream)
          (bt:with-lock-held (*lock*)
            (setf *files-changed* nil)))
      (error () nil))))
