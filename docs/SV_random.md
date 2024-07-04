
# Documentation
- Class name: SV_random
- Category: Clothing - SAL-VTON
- Output node: False

RandomImageFromDir节点旨在从指定目录中随机选择一张图片。这个功能特别适用于需要图片选择变化性和不可预测性的应用场景，例如数据增强过程或在给定上下文中模拟多样化场景。

# Input types
## Required
- folder_path
    - 指定将从中随机选择图片的目录路径。这个参数对于确定可供随机选择的图片池至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 返回从指定目录中随机选择的图片。这个输出对于在进一步处理或显示中引入变化性和随机性至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 提供与随机选择的图片相关联的蒙版（如果适用），以便于进一步的图像处理任务。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RandomImageFromDir:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "folder_path": ("STRING", {
                    "multiline": False,
                    "default": "./input"
                })
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK")
    FUNCTION = "load_image"
    CATEGORY = node_category

    def load_image(self, folder_path):
        files = os.listdir(folder_path)
        image_extensions = {".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".ico", ".jfif"}
        images = [file for file in files if os.path.splitext(file)[1].lower() in image_extensions]

        random_image = os.path.join(folder_path, random.choice(images))
        img = Image.open(random_image)
        output_images = []
        output_masks = []
        # this is from load_image node. Lazy but works :')
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
                mask = torch.zeros((64, 64), dtype=torch.float32, device="cpu")
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
    def IS_CHANGED(s, image):
        return float("NaN")

```
