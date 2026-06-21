(in-package #:website)

(defparameter *root-dir* "./")
(defparameter *input-dir* "content/")
(defparameter *output-dir* "docs/")

(defun get-output-html-file-name (file)
  (let* ((fname (concatenate 'string (pathname-name file) ".html"))
    (output-name (concatenate 'string *output-dir* fname)))
    output-name))

(defun build-html-page (fn file)
  (ensure-directories-exist *output-dir*)
  (with-open-file (stream (get-output-html-file-name file)
                          :direction :output
                          :if-exists :supersede
                          :if-does-not-exist :create)
    (write-line (funcall fn file) stream)))
