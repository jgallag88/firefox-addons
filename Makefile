
target/OldReddit.xpi: $(shell find oldReddit -type f)
	mkdir -p target/
	cd oldReddit/ && zip -r -FS ../$@ *
