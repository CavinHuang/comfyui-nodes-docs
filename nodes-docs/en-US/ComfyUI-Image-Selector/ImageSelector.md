---
tags:
- Image
---

# ImageSelector
## Documentation
- Class name: `ImageSelector`
- Category: `image`
- Output node: `False`

The ImageSelector node is designed to filter and select specific images from a given set based on user-defined indexes. It supports selecting individual images or ranges of images, facilitating customized image processing and manipulation.
## Input types
### Required
- **`images`**
    - The 'images' parameter represents the set of images from which selections are made. It is crucial for determining the subset of images to be processed or analyzed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`selected_indexes`**
    - The 'selected_indexes' parameter specifies the indexes of images to be selected, supporting individual indexes and ranges for flexible image selection. This parameter is case-sensitive.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a filtered set of images, selected according to the specified indexes.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - Reroute



## Source code
```python
class ImageSelector:
    """
    Select some of the images and pipe through
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
                "images": ("IMAGE", ),
                "selected_indexes": ("STRING", {
                    "multiline": False,
                    "default": "1,2,3"
                }),
            },
        }

    RETURN_TYPES = ("IMAGE", )
    # RETURN_NAMES = ("image_output_name",)

    FUNCTION = "run"

    OUTPUT_NODE = False

    CATEGORY = "image"

    def run(self, images: torch.Tensor, selected_indexes: str):
        """
        根据 selected_indexes 选择 images 中的图片，支持连续索引和范围索引

        Args:
            images (torch.Tensor): 输入的图像张量，维度为 [N, C, H, W], 其中 N 为图片数量, C 为通道数, H、W 为图片的高和宽。
            selected_indexes (str): 选择的图片索引，支持连续索引和范围索引，例如："0,2,4:6,8" 表示选择第1、3、5张和第2、4、6、8张图片。

        Returns:
            tuple: 选择的图片张量，维度为 [N', C, H, W]，其中 N' 为选择的图片数量。

        """
        shape = images.shape
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
            print(f"ImageSelector: selected: {len(selected_index)} images")
            return (images[selected_index], )

        print(f"ImageSelector: selected no images, passthrough")
        return (images, )

```
