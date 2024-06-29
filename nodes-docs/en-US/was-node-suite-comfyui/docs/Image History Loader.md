---
tags:
- Image
---

# Image History Loader
## Documentation
- Class name: `Image History Loader`
- Category: `WAS Suite/History`
- Output node: `False`

The Image History Loader node is designed to retrieve and load historical image data from a specified database. It focuses on accessing and processing previously stored images, ensuring that users can easily retrieve and utilize historical image data for various purposes, such as analysis, comparison, or restoration.
## Input types
### Required
- **`image`**
    - The 'image' parameter specifies the name or identifier of the image to be retrieved from the history database. It plays a crucial role in locating and loading the specific historical image data for further processing or analysis.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - This output is a tensor representation of the loaded image, providing the image data for further processing.
    - Python dtype: `torch.Tensor`
- **`filename_text`**
    - Comfy dtype: `STRING`
    - This output is the basename of the image file, providing the image name for reference or display purposes.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_History:
    def __init__(self):
        self.HDB = WASDatabase(WAS_HISTORY_DATABASE)
        self.conf = getSuiteConfig()

    @classmethod
    def INPUT_TYPES(cls):
        HDB = WASDatabase(WAS_HISTORY_DATABASE)
        conf = getSuiteConfig()
        paths = ['No History']
        if HDB.catExists("History") and HDB.keyExists("History", "Images"):
            history_paths = HDB.get("History", "Images")
            if conf.__contains__('history_display_limit'):
                history_paths = history_paths[-conf['history_display_limit']:]
                paths = []
            for path_ in history_paths:
                paths.append(os.path.join('...'+os.sep+os.path.basename(os.path.dirname(path_)), os.path.basename(path_)))

        return {
            "required": {
                "image": (paths,),
            },
        }

    RETURN_TYPES = ("IMAGE",TEXT_TYPE)
    RETURN_NAMES = ("image","filename_text")
    FUNCTION = "image_history"

    CATEGORY = "WAS Suite/History"

    def image_history(self, image):
        self.HDB = WASDatabase(WAS_HISTORY_DATABASE)
        paths = {}
        if self.HDB.catExists("History") and self.HDB.keyExists("History", "Images"):
            history_paths = self.HDB.get("History", "Images")
            for path_ in history_paths:
                paths.update({os.path.join('...'+os.sep+os.path.basename(os.path.dirname(path_)), os.path.basename(path_)): path_})
        if os.path.exists(paths[image]) and paths.__contains__(image):
            return (pil2tensor(Image.open(paths[image]).convert('RGB')), os.path.basename(paths[image]))
        else:
            cstr(f"The image `{image}` does not exist!").error.print()
            return (pil2tensor(Image.new('RGB', (512,512), (0, 0, 0, 0))), 'null')

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")

```
