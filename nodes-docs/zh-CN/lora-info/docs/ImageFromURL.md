
# Documentation
- Class name: ImageFromURL
- Category: jitcoder
- Output node: True

ImageFromURL 节点设计用于从给定的 URL 获取并处理图像，将其转换为适合进一步图像处理或机器学习任务的张量格式。

# Input types
## Required
- url
    - 要获取的图像的 URL。这个参数对节点的操作至关重要，因为它指定了要处理的图像的来源。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 以张量格式处理后的图像，可用于进一步处理或分析。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageFromURL:
    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "url": ("STRING", {"multiline": False})
            },
        }

    RETURN_NAMES = ("image",)
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "fetch_image"
    OUTPUT_NODE = True
    CATEGORY = "jitcoder"

    def fetch_image(self, url):
        image = Image.open(requests.get(url, stream=True).raw)
        image = ImageOps.exif_transpose(image)
        image = image.convert("RGB")
        image = numpy.array(image).astype(numpy.float32) / 255.0
        image = torch.from_numpy(image)[None,]
        return (image,)

```
