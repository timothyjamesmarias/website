(in-package #:website)
(setf spinneret:*html-style* :tree)

(defun build ()
  (build-content-pages)
  (build-non-content-pages))

(defun dev ()
  (build)
  (hunchentoot:start
   (make-instance 'hunchentoot:easy-acceptor
                  :port 8080
                  :document-root #p "public/")))
