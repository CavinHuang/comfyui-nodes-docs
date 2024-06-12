---
tags:
- AnimationScheduling
- Frame
---

# ⚋ Frame Counter (Directory)
## Documentation
- Class name: `Frame Counter (Directory) [Dream]`
- Category: `✨ Dream/🎥 animation`
- Output node: `False`

This node is designed to count the number of frames based on images found in a specified directory, matching a given pattern, and ordered either numerically or alphabetically. It's particularly useful in animation projects where tracking the progression of frames is essential.
## Input types
### Required
- **`directory_path`**
    - Specifies the path to the directory containing the images to be counted. This path is crucial for locating and processing the images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`pattern`**
    - Defines the pattern (e.g., '*.jpg') to match files in the directory. This pattern determines which files are considered in the frame count.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`indexing`**
    - Determines the order in which images are indexed and counted, either numerically or alphabetically. This affects the sequence of frame counting.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`total_frames`**
    - Sets the maximum number of frames to count, providing a limit to the frame counting process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`frames_per_second`**
    - Specifies the frame rate, which is used to calculate the duration of the animation based on the number of frames.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`frame_counter`**
    - Comfy dtype: `FRAME_COUNTER`
    - Outputs a FrameCounter object, encapsulating the current frame count, total frames, and frames per second.
    - Python dtype: `FrameCounter`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamDirectoryBackedFrameCounter:
    NODE_NAME = "Frame Counter (Directory)"
    ICON = "⚋"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "directory_path": ("STRING", {"default": '', "multiline": False}),
                "pattern": ("STRING", {"default": '*', "multiline": False}),
                "indexing": (["numeric", "alphabetic order"],),
                "total_frames": ("INT", {"default": 100, "min": 2, "max": 24 * 3600 * 60}),
                "frames_per_second": ("INT", {"min": 1, "default": 30}),
            },
        }

    CATEGORY = NodeCategories.ANIMATION
    RETURN_TYPES = (FrameCounter.ID,)
    RETURN_NAMES = ("frame_counter",)
    FUNCTION = "result"

    @classmethod
    def IS_CHANGED(cls, *values):
        return ALWAYS_CHANGED_FLAG

    def result(self, directory_path, pattern, indexing, total_frames, frames_per_second):
        results = list_images_in_directory(directory_path, pattern, indexing == "alphabetic order")
        if not results:
            return (FrameCounter(0, total_frames, frames_per_second),)
        n = max(results.keys()) + 1
        return (FrameCounter(n, total_frames, frames_per_second),)

```
