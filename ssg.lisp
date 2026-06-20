(in-package #:website)

(defparameter *input-dir* "content/")
(defparameter *output-dir* "public/")

(defun markdown-file-p (path)
  (string-equal (pathname-type path) "md"))

(defun convert-md-to-html (markdown-string)
  (with-output-to-string (stream)
    (3bmd:parse-string-and-print-to-stream markdown-string stream)))

(defun get-content-from-file (file)
  (uiop:read-file-string file))

(defun get-html-file-name (file)
  (let* ((fname (concatenate 'string (pathname-name file) ".html"))
    (output-name (concatenate 'string *output-dir* fname)))
    output-name))

(defun build-page (file)
  (let* ((md-file-contents (get-content-from-file file))
         (converted-html-contents (convert-md-to-html md-file-contents)))
    (default-layout converted-html-contents)))

(defun build-html-page (file)
  (ensure-directories-exist *output-dir*)
  (with-open-file (stream (get-html-file-name file)
                          :direction :output
                          :if-exists :supersede
                          :if-does-not-exist :create)
    (write-line (build-page file) stream)))

(defun walk-content-files (root fn)
  (labels ((walk (dir)
             (dolist (file (uiop:directory-files dir))
               (when (string-equal (pathname-type file) "md")
                 (funcall fn file)))
             (dolist (subdir (uiop:subdirectories dir))
               (walk subdir))))
    (walk (pathname *input-dir*))))

(defun build-content-pages ()
  (walk-content-files
   (pathname *input-dir*)
   (lambda (file)
     (build-html-page file))))
