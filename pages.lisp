(in-package #:website)

(defparameter *pages* '(blog-page 404-page))

(defun blog-page ()
  (with-html-string
    (:p "blog page")))

(defun 404-page ()
  (with-html-string
    (:p "404 page not found")))

(defun truncate-page-name (name)
  (let ((pos (search "-page" name)))
    (if pos (subseq name 0 pos)
        name)))

(defun get-non-content-page-file-name (name)
  (get-output-html-file-name (truncate-page-name name)))

(defun build-non-content-pages ()
  (dolist (page-fn *pages*)
    (let* ((file (get-non-content-page-file-name (string-downcase (symbol-name page-fn)))))
      (build-html-page (lambda (file)
                         (default-layout (funcall page-fn)))
                       file))))
