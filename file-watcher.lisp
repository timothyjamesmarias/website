(in-package #:website)

(defparameter *worker-thread* nil)
(defparameter *watch-interval* 2)

(defun watch-file-changes (dir interval fn)
  (setf *worker-thread*
        (bt:make-thread
         (lambda () (let ((last-build (get-universal-time)))
                    (loop
                      (sleep interval)
                      (when (> (newest-time dir) last-build)
                        (format t "~a~%" "debug log: something changed")
                        (format t "newest: ~a last-build: ~a~%" (newest-time dir) last-build)
                        (setf *files-changed* t)
                        (funcall fn)
                        (setf last-build (newest-time dir)))))))))

(defun walk-project-files (root)
  (let ((files nil))
    (labels ((walk (dir)
               (dolist (file (uiop:directory-files dir))
                 (push file files))
             (dolist (subdir (uiop:subdirectories dir))
               (unless (equal (enough-namestring subdir) *output-dir*)
               (walk subdir)))))
             (walk (pathname root)))
    files))

(defun some-file-newer-p (dir latest-date)
  (let ((files (walk-project-files dir)))
    (dolist (file files)
      (when (> (file-write-date file) latest-date)
        (return t)))))

(defun newest-time (dir)
  (let ((latest 0))
    (dolist (file (walk-project-files dir))
      (let ((mtime (file-write-date file)))
        (when (> mtime latest)
          (setf latest mtime))))
    latest))
