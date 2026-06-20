(in-package #:website)

(defun default-layout (content)
  (with-html-string
      (:doctype)
    (:html
     (:head
     (:title "title string"))
     (:header (:p "header text"))
    (:main (:raw content))
    (:footer (:p "footer text")))))
