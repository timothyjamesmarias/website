(in-package #:website)

(defparameter *root-dir* (truename "./"))
(defparameter *input-dir* "content/")
(defparameter *output-dir* "docs/")

(defun build-html-page (fn file)
  (ensure-directories-exist file)
  (with-open-file (stream file
                          :direction :output
                          :if-exists :supersede
                          :if-does-not-exist :create)
    (write-line (funcall fn) stream)))
