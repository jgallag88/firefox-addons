
all: target/OldReddit.xpi target/NoYouTubeShorts.xpi

target/OldReddit.xpi: $(shell find oldReddit -type f)
	mkdir -p target/
	cd oldReddit/ && zip -r -FS ../$@ *

target/NoYouTubeShorts.xpi: $(shell find noYouTubeShorts -type f)
	mkdir -p target/
	cd noYouTubeShorts/ && zip -r -FS ../$@ *
