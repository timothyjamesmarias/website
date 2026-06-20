(in-package #:website)

(defun build ()
  (build-content-pages))

(defun dev ()
  (build)
  (hunchentoot:start
   (make-instance 'hunchentoot:easy-acceptor
                  :port 8080
                  :document-root #p "public/")))
