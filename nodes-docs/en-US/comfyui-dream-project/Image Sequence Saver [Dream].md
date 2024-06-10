---
tags:
- Image
- ImageSave
---

# 💾 Image Sequence Saver
## Documentation
- Class name: `Image Sequence Saver [Dream]`
- Category: `✨ Dream/🌄 image/🎥 animation`
- Output node: `True`

The Image Sequence Saver node is designed to save individual frames of an animation sequence to disk, supporting various file formats and configurations. It allows for detailed control over the output naming convention, directory structure, and file format, facilitating the creation of organized and accessible animation frame libraries.
## Input types
### Required
- **`frame_counter`**
    - Specifies the current frame in the animation sequence, used to determine the filename and whether the saving process should continue based on the 'at_end' parameter.
    - Comfy dtype: `FRAME_COUNTER`
    - Python dtype: `FrameCounter`
- **`image`**
    - The image to be saved for the current frame, representing a single snapshot in the animation sequence.
    - Comfy dtype: `IMAGE`
    - Python dtype: `DreamImage`
- **`directory_path`**
    - The target directory path where the image file will be saved, allowing for organized storage of animation frames.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`prefix`**
    - A prefix added to the filename of each saved image, aiding in the identification and organization of frames within the directory.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`digits`**
    - The number of digits to use for zero-padding the frame number in the filename, ensuring a consistent file naming convention.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`at_end`**
    - Determines the behavior when the end of the animation sequence is reached, offering options to stop output, raise an error, or keep going.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`filetype`**
    - Specifies the file format for the saved image, including options for PNG with or without embedded workflow information, and JPG.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`sequence`**
    - Comfy dtype: `ANIMATION_SEQUENCE`
    - The updated animation sequence after saving the current frame, reflecting any changes or additions.
    - Python dtype: `AnimationSequence.ID`
- **`log_entry`**
    - Comfy dtype: `LOG_ENTRY`
    - A log entry detailing the outcome of the save operation, including success messages or error information.
    - Python dtype: `LogEntry.ID`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamImageSequenceOutput:
    NODE_NAME = "Image Sequence Saver"
    ICON = "💾"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.frame_counter | {
                "image": ("IMAGE",),
                "directory_path": ("STRING", {"default": comfy_paths.output_directory, "multiline": False}),
                "prefix": ("STRING", {"default": 'frame', "multiline": False}),
                "digits": ("INT", {"default": 5}),
                "at_end": (["stop output", "raise error", "keep going"],),
                "filetype": (['png with embedded workflow', "png", 'jpg'],),
            },
            "hidden": {
                "prompt": "PROMPT",
                "extra_pnginfo": "EXTRA_PNGINFO"
            },
        }

    CATEGORY = NodeCategories.IMAGE_ANIMATION
    RETURN_TYPES = (AnimationSequence.ID, LogEntry.ID)
    OUTPUT_NODE = True
    RETURN_NAMES = ("sequence", "log_entry")
    FUNCTION = "save"

    @classmethod
    def IS_CHANGED(cls, *values):
        return hashed_as_strings(*values)

    def _get_new_filename(self, current_frame, prefix, digits, filetype):
        return prefix + "_" + str(current_frame).zfill(digits) + "." + filetype.split(" ")[0]

    def _save_single_image(self, dream_image: DreamImage, batch_counter, frame_counter: FrameCounter,
                           directory_path,
                           prefix, digits, filetype, prompt, extra_pnginfo, at_end, logger):

        if at_end == "stop output" and frame_counter.is_after_last_frame:
            logger("Reached end of animation - not saving output!")
            return ()
        if at_end == "raise error" and frame_counter.is_after_last_frame:
            logger("Reached end of animation - raising error to stop processing!")
            raise Exception("Reached end of animation!")
        filename = self._get_new_filename(frame_counter.current_frame, prefix, digits, filetype)
        if batch_counter >= 0:
            filepath = os.path.join(directory_path, "batch_" + (str(batch_counter).zfill(4)), filename)
        else:
            filepath = os.path.join(directory_path, filename)
        save_dir = os.path.dirname(filepath)
        if not os.path.isdir(save_dir):
            os.makedirs(save_dir)
        if filetype.startswith("png"):
            dream_image.save_png(filepath, filetype == 'png with embedded workflow', prompt, extra_pnginfo)
        elif filetype == "jpg":
            dream_image.save_jpg(filepath, int(CONFIG.get("encoding.jpeg_quality", 95)))
        logger("Saved {} in {}".format(filename, os.path.abspath(save_dir)))
        return ()

    def _generate_animation_sequence(self, filetype, directory_path, frame_counter):
        if filetype.startswith("png"):
            pattern = "*.png"
        else:
            pattern = "*.jpg"
        frames = list_images_in_directory(directory_path, pattern, False)
        return AnimationSequence(frame_counter, frames)

    def save(self, image, **args):
        log_texts = list()
        logger = lambda s: log_texts.append(s)
        if not args.get("directory_path", ""):
            args["directory_path"] = comfy_paths.output_directory
        args["logger"] = logger
        proc = DreamImageProcessor(image, **args)
        proc.process(self._save_single_image)
        frame_counter = args["frame_counter"]
        log_entry = LogEntry([])
        for text in log_texts:
            log_entry = log_entry.add(text)
        if frame_counter.is_final_frame:
            return (self._generate_animation_sequence(args["filetype"], args["directory_path"],
                                                      frame_counter), log_entry)
        else:
            return (AnimationSequence(frame_counter), log_entry)

```
