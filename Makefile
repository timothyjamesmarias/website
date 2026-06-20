APP=website

dev:
	sbcl --eval '(ql:quickload "$(APP)")' \
		 --eval '($(APP):dev)'

build:
	sbcl --non-interactive \
		 --eval '(ql:quickload "$(APP)")' \
		 --eval '($(APP):build)'

clean:
	rm -rf public/
