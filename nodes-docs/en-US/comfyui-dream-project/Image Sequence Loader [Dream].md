---
tags:
- Image
- ImageSequence
---

# 💾 Image Sequence Loader
## Documentation
- Class name: `Image Sequence Loader [Dream]`
- Category: `✨ Dream/🌄 image/🎥 animation`
- Output node: `False`

The Image Sequence Loader node is designed to load a sequence of images from a specified directory, applying a pattern and indexing method to select the images. It can also provide a default image as a fallback option if no images are found matching the criteria.
## Input types
### Required
- **`frame_counter`**
    - Represents the current frame counter, used to determine which image in the sequence to load based on its order.
    - Comfy dtype: `FRAME_COUNTER`
    - Python dtype: `FrameCounter`
- **`directory_path`**
    - The path to the directory where the image sequence is stored. This allows the node to locate and load the images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`pattern`**
    - A pattern to match filenames within the directory, enabling selective loading of images based on their names.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`indexing`**
    - Determines the method of indexing the images, either numerically or in alphabetical order, to establish the sequence order.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`default_image`**
    - An optional default image to return if no images match the specified pattern and indexing in the directory.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The loaded image from the sequence based on the current frame counter, or the default image if no matching image is found.
    - Python dtype: `DreamImage`
- **`frame_name`**
    - Comfy dtype: `STRING`
    - The name of the frame loaded from the sequence, providing context or identification for the image.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamImageSequenceInputWithDefaultFallback:
    NODE_NAME = "Image Sequence Loader"
    ICON = "💾"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": SharedTypes.frame_counter | {
                "directory_path": ("STRING", {"default": '', "multiline": False}),
                "pattern": ("STRING", {"default": '*', "multiline": False}),
                "indexing": (["numeric", "alphabetic order"],)
            },
            "optional": {
                "default_image": ("IMAGE", {"default": None})
            }
        }

    CATEGORY = NodeCategories.IMAGE_ANIMATION
    RETURN_TYPES = ("IMAGE","STRING")
    RETURN_NAMES = ("image","frame_name")
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return ALWAYS_CHANGED_FLAG

    def result(self, frame_counter: FrameCounter, directory_path, pattern, indexing, **other):
        default_image = other.get("default_image", None)
        entries = list_images_in_directory(directory_path, pattern, indexing == "alphabetic order")
        entry = entries.get(frame_counter.current_frame, None)
        if not entry:
            return (default_image, "")
        else:
            image_names = [os.path.basename(file_path) for file_path in entry]
            images = map(lambda f: DreamImage(file_path=f), entry)
            return (DreamImage.join_to_tensor_data(images), image_names[0]) 

```
