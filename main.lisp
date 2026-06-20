(in-package #:website)
(setf spinneret:*html-style* :tree)

(defun build-all-pages ()
  (build-content-pages)
  (build-non-content-pages))

(defun build ()
  (build-all-pages))

(defun dev ()
  (watch-file-changes
   *root-dir*
   *watch-interval*
   (lambda () (build-all-pages)))
  (hunchentoot:start
   (make-instance 'hunchentoot:easy-acceptor
                  :port 8080
                  :document-root #p "public/")))
