(asdf:defsystem "website"
  :depends-on ("spinneret" "3bmd" "hunchentoot")
  :serial t
  :components ((:file "package")
               (:file "main")
               (:file "file-watcher")
               (:file "shared")
               (:file "ssg")
               (:file "pages")
               (:file "components")
               (:file "layouts")))
