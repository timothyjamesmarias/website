(in-package #:website)

(defun blog-page ()
  (with-html
    (:p "blog page")))

(defun 404-page ()
  (with-html
    (:p "404 page not found")))
