---
tags:
- Image
- ImageSave
---

# SaveImage (Simple)
## Documentation
- Class name: `easy imageSave`
- Category: `EasyUse/Image`
- Output node: `True`

The 'easy imageSave' node is designed to simplify the process of saving images. It abstracts the complexities involved in file handling and image encoding, providing a straightforward way for users to save images to disk with minimal configuration.
## Input types
### Required
- **`images`**
    - Specifies the images to be saved. This parameter is crucial as it directly influences the output by determining which images are processed and stored.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`filename_prefix`**
    - Defines the prefix for the saved image filenames, allowing users to organize their saved images more effectively by categorizing them under a common prefix.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`only_preview`**
    - Determines if the node should only preview the images without saving them, offering an option to review images before committing to save.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class imageSaveSimple:

  def __init__(self):
    self.output_dir = folder_paths.get_output_directory()
    self.type = "output"
    self.prefix_append = ""
    self.compress_level = 4

  @classmethod
  def INPUT_TYPES(s):
    return {"required":
              {
                "images": ("IMAGE",),
                "filename_prefix": ("STRING", {"default": "ComfyUI"}),
                "only_preview": ("BOOLEAN", {"default": False}),
              },
              "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
            }

  RETURN_TYPES = ()
  FUNCTION = "save"
  OUTPUT_NODE = True
  CATEGORY = "EasyUse/Image"

  def save(self, images, filename_prefix="ComfyUI", only_preview=False, prompt=None, extra_pnginfo=None):
    if only_preview:
      PreviewImage().save_images(images, filename_prefix, prompt, extra_pnginfo)
      return ()
    else:
      return SaveImage().save_images(images, filename_prefix, prompt, extra_pnginfo)

```
