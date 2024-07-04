
# Documentation
- Class name: ImageBatchSplitter __Inspire
- Category: InspirePack/Util
- Output node: False

ImageBatchSplitter节点旨在将一批图像拆分成更小的批次或单独的图像，基于指定的拆分数量。如果请求的拆分数量超过可用图像的数量，它还可以用空白图像填充输出，确保输出始终匹配请求的大小。

# Input types
## Required
- images
    - 要拆分的图像集合。这个参数对于确定要根据指定数量处理和拆分的图像子集至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- split_count
    - 指定从输入批次中提取的拆分数量或单个图像数量。这个数量直接影响输出批次的大小和组成。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 一个张量元组，每个张量代表从原始输入批次中拆分出的一个批次或单个图像，可能包括用空白图像填充以满足请求的拆分数量。
    - Comfy dtype: IMAGE
    - Python dtype: Tuple[torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageBatchSplitter:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "images": ("IMAGE",),
                    "split_count": ("INT", {"default": 4, "min": 0, "max": 50, "step": 1}),
                    },
                }

    RETURN_TYPES = ByPassTypeTuple(("IMAGE", ))
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Util"

    def doit(self, images, split_count):
        cnt = min(split_count, len(images))
        res = [image.unsqueeze(0) for image in images[:cnt]]

        if split_count >= len(images):
            lack_cnt = split_count - cnt + 1  # including remained
            empty_image = empty_pil_tensor()
            for x in range(0, lack_cnt):
                res.append(empty_image)
        elif cnt < len(images):
            remained_cnt = len(images) - cnt
            remained_image = images[-remained_cnt:]
            res.append(remained_image)

        return tuple(res)

```
