
# Documentation
- Class name: IG Load Image
- Category: 🐓 IG Nodes/IO
- Output node: False

IG Load Image节点旨在从指定目录加载图像，提供了图像预处理功能，如方向校正、转换为特定颜色模式和标准化。它简化了图像加载和预处理的复杂性，使图像数据更容易集成到工作流程中。

# Input types
## Required
- image_path
    - image_path参数指定要加载的图像的路径。它在确定将要处理哪个图像文件方面起着关键作用，影响节点的执行和最终的图像数据。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - image参数代表经过预处理的图像数据，可用于进一步处理或分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - mask参数为加载的图像提供了一个掩码，对于需要分割或特定区域处理的操作很有用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IG_LoadImage:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image_path": ("STRING", {"forceInput": True}),
            },
        }
    
    RETURN_TYPES = ("IMAGE", "MASK")
    FUNCTION = "main"

    CATEGORY = TREE_IO

    def main(self, image_path: str, **kwargs):
        img = Image.open(image_path)
        output_images = []
        output_masks = []
        for i in ImageSequence.Iterator(img):
            i = ImageOps.exif_transpose(i)
            if i.mode == 'I':
                i = i.point(lambda i: i * (1 / 255))
            image = i.convert("RGB")
            image = np.array(image).astype(np.float32) / 255.0
            image = torch.from_numpy(image)[None,]
            if 'A' in i.getbands():
                mask = np.array(i.getchannel('A')).astype(np.float32) / 255.0
                mask = 1. - torch.from_numpy(mask)
            else:
                mask = torch.zeros((64,64), dtype=torch.float32, device="cpu")
            output_images.append(image)
            output_masks.append(mask.unsqueeze(0))

        if len(output_images) > 1:
            output_image = torch.cat(output_images, dim=0)
            output_mask = torch.cat(output_masks, dim=0)
        else:
            output_image = output_images[0]
            output_mask = output_masks[0]

        return (output_image, output_mask)
    
    @classmethod
    def IS_CHANGED(s, image_path: str, **kwargs):
        return is_changed_image(image_path, **kwargs)

```
