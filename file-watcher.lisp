(in-package #:website)

(defparameter *worker-thread* nil)
(defparameter *watch-interval* 2)

(defun watch-file-changes (dir interval fn)
  (setf *worker-thread*
        (bt:make-thread
         (lambda () (let ((last-build (get-universal-time)))
                    (loop
                      (sleep interval)
                      (when (some-file-newer-p dir last-build)
                        (format t "~a~%" "debug log: something changed")
                        (setf *files-changed* t)
                        (funcall fn)
                        (setf last-build (get-universal-time)))))))))


(defun walk-project-files (root)
  (let ((files nil))
    (labels ((walk (dir)
               (dolist (file (uiop:directory-files dir))
                 (push file files))
             (dolist (subdir (uiop:subdirectories dir))
               (walk subdir))))
             (walk (pathname root)))
    files))

(defun some-file-newer-p (dir latest-date)
  (let ((files (walk-project-files dir)))
    (dolist (file files)
      (when (> (file-write-date file) latest-date)
        (return t)))))
