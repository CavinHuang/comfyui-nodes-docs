---
tags:
- Batch
- Image
- ImageDuplication

# ImageBatchCopy
## 文档说明
### 类名：`ImageBatchCopy`
### 分类：`image/batch`
### 输出节点：`False`

`ImageBatchCopy` 节点旨在在图像批次中复制特定的图像，指定次数。它专注于调整图像批次的组成，通过重复选定的图像来增加或多样化数据集，以便进一步处理或分析。
## 输入类型
### 必需项
- **`images`**
    - 指定要处理的一组图像。此参数用于确定将从其中复制的源图像。
    - Comfy 数据类型：`IMAGE`
    - Python 数据类型：`torch.Tensor`
- **`index`**
    - 表示要在批次中复制的图像的位置。此参数对于选择特定需要复制的图像至关重要。
    - Comfy 数据类型：`INT`
    - Python 数据类型：`int`
- **`quantity`**
    - 定义选定图像在批次内应被复制的次数。此参数直接影响输出批次的大小，通过增加图像的数量来改变批次的组成。
    - Comfy 数据类型：`INT`
    - Python 数据类型：`int`
## 输出类型
- **`image`**
    - Comfy 数据类型：`IMAGE`
    - 返回一个新批次的图像，在其中已复制了指定次数的特定图像，从而改变了批次的组成。
    - Python 数据类型：`torch.Tensor`

## 使用提示
- 硬件类型：`GPU`
- 常用节点：未知

## 源代码
```python
class ImageBatchCopy:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "index": ("INT", {
                    "default": 1,
                    "min": 1,
                    "step": 1
                }),
                "quantity": ("INT", {
                    "default": 1,
                    "min": 2,
                    "step": 1
                })
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/batch"

    def node(self, images, index, quantity):
        batch_size = images.shape[0]
        index = min(batch_size, index) - 1

        return (images[index].repeat(quantity, 1, 1, 1),)
```