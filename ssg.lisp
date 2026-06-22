(in-package #:website)

(defun markdown-file-p (path)
  (string-equal (pathname-type path) "md"))

(defun convert-md-to-html (markdown-string)
  (with-output-to-string (stream)
    (3bmd:parse-string-and-print-to-stream markdown-string stream)))

(defun get-content-from-file (file)
  (uiop:read-file-string file))

(defun build-content-page (file)
  (let* ((md-file-contents (get-content-from-file file))
         (converted-html-contents (convert-md-to-html md-file-contents)))
    (default-layout converted-html-contents)))

(defun extract-dirs (file)
  (directory-namestring
   (enough-namestring
    (pathname file)
    (truename *input-dir*))))

(defun build-content-output-file (file)
  (concatenate 'string
               *output-dir*
               (extract-dirs file)
               (concatenate 'string (pathname-name file) ".html")))

(defun walk-content-files (root fn)
  (labels ((walk (dir)
             (dolist (file (uiop:directory-files dir))
               (when (string-equal (pathname-type file) "md")
                 (funcall fn file)))
             (dolist (subdir (uiop:subdirectories dir))
               (walk subdir))))
    (walk (pathname root))))

(defun build-content-pages ()
  (walk-content-files
   (pathname *input-dir*)
   (lambda (file)
     (build-html-page
      (lambda (file) (build-content-page file))
      (build-content-output-file file)))))
