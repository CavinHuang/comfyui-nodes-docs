---
tags:
- Preview
---

# Preview Image
## Documentation
- Class name: `PreviewImage`
- Category: `image`
- Output node: `True`

The PreviewImage node is designed for creating temporary preview images. It automatically generates a unique temporary file name for each image, compresses the image to a specified level, and saves it to a temporary directory. This functionality is particularly useful for generating previews of images during processing without affecting the original files.
## Input types
### Required
- **`images`**
    - The 'images' input specifies the images to be processed and saved as temporary preview images. This is the primary input for the node, determining which images will undergo the preview generation process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Tuple[torch.Tensor]`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PreviewImage(SaveImage):
    def __init__(self):
        self.output_dir = folder_paths.get_temp_directory()
        self.type = "temp"
        self.prefix_append = "_temp_" + ''.join(random.choice("abcdefghijklmnopqrstupvxyz") for x in range(5))
        self.compress_level = 1

    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"images": ("IMAGE", ), },
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
                }

```
