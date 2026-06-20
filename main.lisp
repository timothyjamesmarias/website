(in-package #:website)

(defun build ()
  (walk-content-files
   #P"content/"
   (lambda (file)
     (build-html-page file))))

(defun dev ()
  (build)
  (hunchentoot:start
   (make-instance 'hunchentoot:easy-acceptor
                  :port 8080
                  :document-root #p "public/")))
