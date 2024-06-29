---
tags:
- Image
- ImageSave
---

# Save Images No Display (Mikey)
## Documentation
- Class name: `Save Images No Display`
- Category: `Mikey/Image`
- Output node: `True`

This node is designed to save images without displaying them in the UI, extending the functionality of its parent class to focus on backend image processing and storage.
## Input types
### Required
- **`images`**
    - The images to be saved; central to the node's operation as it determines the content to be stored.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`sub_directory`**
    - Specifies the sub-directory path where images will be saved, influencing the organization of saved images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`filename_text_i`**
    - Part of the filename composition, contributing to a customizable naming convention for saved images. This represents a series of filename components (filename_text_1, filename_text_2, filename_text_3) allowing for extensive customization.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`filename_separator`**
    - Defines the separator used between filename components, affecting the readability and structure of filenames.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`timestamp`**
    - Timestamp information to be included in the filename, providing temporal context to the saved images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`counter_type`**
    - Determines the type of counter used in the filename, aiding in the unique identification of each saved image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`filename_text_i_pos`**
    - Positional information for the text components in the filename, influencing the naming order. This represents a series of positions (filename_text_1_pos, filename_text_2_pos, filename_text_3_pos) for each text component.
    - Comfy dtype: `INT`
    - Python dtype: `str`
- **`timestamp_pos`**
    - Specifies the position of the timestamp in the filename, affecting the overall naming convention.
    - Comfy dtype: `INT`
    - Python dtype: `str`
- **`timestamp_type`**
    - Indicates the format of the timestamp used in the filename, providing clarity on the temporal information's presentation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`counter_pos`**
    - Positional information for the counter in the filename, contributing to the unique identification of each image.
    - Comfy dtype: `INT`
    - Python dtype: `str`
- **`extra_metadata`**
    - Allows for the inclusion of extra metadata in the saved images, enriching the information associated with each file.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaveImageNoDisplay(SaveImagesMikeyML):
    # inherits from SaveImagesMikeyML
    # only difference is we are not going to output anything to the UI
    def __init__(self):
        super().__init__()

    RETURN_TYPES = ()
    FUNCTION = "save_images_no_display"
    OUTPUT_NODE = True
    CATEGORY = "Mikey/Image"

    def save_images_no_display(self, images, sub_directory, filename_text_1, filename_text_2, filename_text_3,
                    filename_separator, timestamp, counter_type,
                    filename_text_1_pos, filename_text_2_pos, filename_text_3_pos,
                    timestamp_pos, timestamp_type, counter_pos, extra_metadata,
                    prompt=None, extra_pnginfo=None):
        self.save_images(images, sub_directory, filename_text_1, filename_text_2, filename_text_3,
                    filename_separator, timestamp, counter_type,
                    filename_text_1_pos, filename_text_2_pos, filename_text_3_pos,
                    timestamp_pos, timestamp_type, counter_pos, extra_metadata,
                    prompt, extra_pnginfo)
        return (None,)

```
