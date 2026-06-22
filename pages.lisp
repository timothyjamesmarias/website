(in-package #:website)

(defparameter *pages* '((blog-page . "blog")
                        (404-page . "errors/404")))

(defun blog-page ()
  (with-html-string
    (:p "blog page")))

(defun 404-page ()
  (with-html-string
    (:p "404 page not found")))

(defun build-non-content-output-file (file)
  (concatenate 'string *output-dir* file ".html"))

(defun build-non-content-pages ()
  (dolist (page-cons *pages*)
    (let* ((page-file (cdr page-cons))
           (page-fn (car page-cons)))
           (build-html-page
             (lambda () (default-layout (funcall page-fn)))
             (build-non-content-output-file page-file)))))
