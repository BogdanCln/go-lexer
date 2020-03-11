PROJECT = "go-lexer"
SHELL := /bin/bash
NODE_PATH = $(shell ./find-node-or-install)
PATH := $(NODE_PATH):$(shell echo $$PATH)

all: install start

start:
ifeq ($(i),)
	@echo "No input specified. Example: make start i=./tests/go_sources/hello.go"
else
	echo "Starting ${PROJECT} on input $(i)"
	export NODE_PATH=.
	npm start $(i)
endif

install:
	echo "Installing ${PROJECT}...";\
	npm install;

update:
	echo "Updating ${PROJECT}...";
	git pull --rebase;
	npm update;

clean :
	rm -rf node_modules;