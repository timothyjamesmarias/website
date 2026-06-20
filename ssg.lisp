(in-package #:website)

(defun markdown-file-p (path)
  (string-equal (pathname-type path) "md"))

(defun md-to-html (markdown-string)
  (with-output-to-string (stream)
    (3bmd:parse-string-and-print-to-stream markdown-string stream)))

(defun get-content-from-file (file)
  (uiop:read-file-string file))

(defun html-file-name (file)
  (concatenate 'string (pathname-name file) ".html"))

(defun build-page (file)
  (let* ((md-file-contents (get-content-from-file file))
         (converted-html-contents (md-to-html md-file-contents)))
    converted-html-contents))

(defun build-html-page (file)
  (with-open-file (stream (html-file-name file)
                          :direction :output
                          :if-exists :supersede
                          :if-does-not-exist :create)
    (write-line (build-page file) stream))
  )

(defun walk-content-files (root fn)
  (labels ((walk (dir)
             (dolist (file (uiop:directory-files dir))
               (when (string-equal (pathname-type file) "md")
                 (funcall fn file)))
             (dolist (subdir (uiop:subdirectories dir))
               (walk subdir))))
    (walk #P"content/")))

