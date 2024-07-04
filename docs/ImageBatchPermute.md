---
tags:
- Batch
- Image
- ImageBatch

---

# ImageBatchPermute
## 文档说明
### 类名：`ImageBatchPermute`
### 分类：`image/batch`
### 输出节点：`False`

`ImageBatchPermute` 节点旨在根据指定的置换对一批图像进行重新排序。它允许动态重组图像序列，便于执行如洗牌或特定顺序的操作以供处理或可视化。

## 输入类型
### 必需项
- **`images`**
    - `images` 参数表示要被重新排列的一批图像集。它是定义将根据置换模式重新组织的图像集的关键。
    - Comfy dtype：`IMAGE`
    - Python dtype：`torch.Tensor`
- **`permute`**
    - `permute` 参数指定批量中应如何排列图像。它直接影响最终的图像排列，允许自定义序列或洗牌。
    - Comfy dtype：`STRING`
    - Python dtype：`str`
- **`start_with_zero`**
    - `start_with_zero` 参数表示置换索引是否从零开始。这会影响应用到图像批处理的置换模式的方式，与基于零或一的索引约定相匹配。
    - Comfy dtype：`BOOLEAN`
    - Python dtype：`bool`

## 输出类型
- **`image`**
    - Comfy dtype：`IMAGE`
    - 输出是一组重新排列的图像集，根据指定的置换模式进行排列。它允许动态重组图像序列以供进一步处理或可视化。
    - Python dtype：`torch.Tensor`

## 使用提示
### 基础类型：`GPU`
### 常用节点：未知

## 源代码
```python
class ImageBatchPermute:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "permute": ("STRING", {"multiline": False}),
                "start_with_zero": ("BOOLEAN",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/batch"

    def node(self, images, permute, start_with_zero):
        # 从置换字符串中提取数字，并转换为整数索引
        order = [int(num) - 1 if not start_with_zero else int(num) for num in re.findall(r'\d+', permute)]
        
        # 创建一个张量来存储排序后的顺序
        order = torch.tensor(order)
        
        # 确保索引在有效范围内（0到图像数量减一）
        order = order.clamp(0, images.shape[0] - 1)

        # 使用索引选择函数对输入图像进行重新排列
        return (images.index_select(0, order),)

```