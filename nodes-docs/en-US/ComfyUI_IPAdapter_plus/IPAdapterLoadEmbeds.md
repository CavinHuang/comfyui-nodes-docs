---
tags:
- IPAdapter
---

# IPAdapter Load Embeds
## Documentation
- Class name: `IPAdapterLoadEmbeds`
- Category: `ipadapter/embeds`
- Output node: `False`

The IPAdapterLoadEmbeds node is designed for loading pre-saved embedding vectors from files with a specific extension, facilitating the reuse of embeddings in image processing applications.
## Input types
### Required
- **`embeds`**
    - Specifies the file names from which to load the embeddings, enabling the selection of specific pre-saved embeddings for use in the node's operation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`embeds`**
    - Comfy dtype: `EMBEDS`
    - Returns the loaded embedding vectors, making them available for further processing or application within the image generation pipeline.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IPAdapterLoadEmbeds:
    @classmethod
    def INPUT_TYPES(s):
        input_dir = folder_paths.get_input_directory()
        files = [os.path.relpath(os.path.join(root, file), input_dir) for root, dirs, files in os.walk(input_dir) for file in files if file.endswith('.ipadpt')]
        return {"required": {"embeds": [sorted(files), ]}, }

    RETURN_TYPES = ("EMBEDS", )
    FUNCTION = "load"
    CATEGORY = "ipadapter/embeds"

    def load(self, embeds):
        path = folder_paths.get_annotated_filepath(embeds)
        return (torch.load(path).cpu(), )

```
