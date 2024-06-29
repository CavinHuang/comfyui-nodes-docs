---
tags:
- IPAdapter
---

# IPAdapter Save Embeds
## Documentation
- Class name: `IPAdapterSaveEmbeds`
- Category: `ipadapter/embeds`
- Output node: `True`

The IPAdapterSaveEmbeds node is designed for saving embedding data to a file, facilitating the persistence of computed embeddings for later use or analysis. It abstracts the process of file handling and serialization of embeddings, ensuring data is efficiently stored in a structured manner.
## Input types
### Required
- **`embeds`**
    - The 'embeds' parameter represents the embedding data to be saved. It is crucial for the operation as it contains the actual data that needs to be persisted.
    - Comfy dtype: `EMBEDS`
    - Python dtype: `torch.Tensor`
- **`filename_prefix`**
    - The 'filename_prefix' parameter allows for customization of the saved file's name, providing flexibility in organizing and identifying embedding files.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IPAdapterSaveEmbeds:
    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "embeds": ("EMBEDS",),
            "filename_prefix": ("STRING", {"default": "IP_embeds"})
            },
        }

    RETURN_TYPES = ()
    FUNCTION = "save"
    OUTPUT_NODE = True
    CATEGORY = "ipadapter/embeds"

    def save(self, embeds, filename_prefix):
        full_output_folder, filename, counter, subfolder, filename_prefix = folder_paths.get_save_image_path(filename_prefix, self.output_dir)
        file = f"{filename}_{counter:05}.ipadpt"
        file = os.path.join(full_output_folder, file)

        torch.save(embeds, file)
        return (None, )

```
