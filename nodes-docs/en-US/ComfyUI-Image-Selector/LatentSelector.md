---
tags:
- ConditionalSelection
---

# LatentSelector
## Documentation
- Class name: `LatentSelector`
- Category: `latent`
- Output node: `False`

The LatentSelector node is designed to filter and select specific latent images from a given set based on user-defined indexes. It allows for the customization of the latent image dataset by enabling the selection of particular images, facilitating targeted manipulation or analysis of these images.
## Input types
### Required
- **`latent_image`**
    - The latent images to be filtered, provided as a mapping from string identifiers to tensors. This input is crucial for determining which images are available for selection and manipulation.
    - Comfy dtype: `LATENT`
    - Python dtype: `Mapping[str, torch.Tensor]`
- **`selected_indexes`**
    - A string specifying the indexes of the latent images to be selected. Supports individual indexes and ranges, allowing for flexible selection within the dataset.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The filtered set of latent images, returned as a subset of the input images based on the specified indexes.
    - Python dtype: `Dict[str, torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LatentSelector:
    """
    Select some of the latent images and pipe through
    """

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        """
        Input: list of index of selected image, seperated by comma (",")
        support colon (":") sperated range (left included, right excluded) 
        Indexes start with 1 for simplicity
        """
        return {
            "required": {
                "latent_image": ("LATENT", ),
                "selected_indexes": ("STRING", {
                    "multiline": False,
                    "default": "1,2,3"
                }),
            },
        }

    RETURN_TYPES = ("LATENT", )
    # RETURN_NAMES = ("image_output_name",)

    FUNCTION = "run"

    OUTPUT_NODE = False

    CATEGORY = "latent"

    def run(self, latent_image: clabc.Mapping[str, torch.Tensor],
            selected_indexes: str):
        """
        对latent_image进行筛选，根据selected_indexes指定的索引进行筛选
        Args:
            latent_image: 待筛选的latent_image，Mapping[str, torch.Tensor]，包含'samples'字段
            selected_indexes: 待筛选的索引，以逗号分隔，支持连续索引范围以冒号分隔，例如'1,3,5:7,9'

        Returns:
            筛选后的latent_image，Mapping[str, torch.Tensor]
        """
        samples = latent_image['samples']
        shape = samples.shape
        len_first_dim = shape[0]

        selected_index: list[int] = []
        total_indexes: list[int] = list(range(len_first_dim))
        for s in selected_indexes.strip().split(','):
            try:
                if ":" in s:
                    _li = s.strip().split(':', maxsplit=1)
                    _start = _li[0]
                    _end = _li[1]
                    if _start and _end:
                        selected_index.extend(
                            total_indexes[int(_start) - 1:int(_end) - 1]
                        )
                    elif _start:
                        selected_index.extend(
                            total_indexes[int(_start) - 1:]
                        )
                    elif _end:
                        selected_index.extend(
                            total_indexes[:int(_end) - 1]
                        )
                else:
                    x: int = int(s.strip()) - 1
                    if x < len_first_dim:
                        selected_index.append(x)
            except:
                pass

        if selected_index:
            print(f"LatentSelector: selected: {len(selected_index)} latents")
            return ({'samples': samples[selected_index, :, :, :]}, )

        print(f"LatentSelector: selected no latents, passthrough")
        return (latent_image, )

```
