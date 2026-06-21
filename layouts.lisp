(in-package #:website)

(defun default-layout (content)
  (with-html-string
      (:doctype)
    (:html
     (:head
      (:title "title string")
      (when *dev-mode*
        (:script :src "/development/dev.js")))
     (:header (:p "header text"))
    (:main (:raw content))
    (:footer (:p "footer text")))))
