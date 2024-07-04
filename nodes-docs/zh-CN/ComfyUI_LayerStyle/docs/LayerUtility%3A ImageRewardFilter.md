# Documentation
- Class name: ImageRewardFilter
- Category: 😺dzNodes/LayerUtility
- Output node: False
- Repo Ref: https://github.com/chflame163/ComfyUI_LayerStyle

对批量图片评分并输出排名靠前的图片。这个节点使用了[ImageReward](https://github.com/THUDM/ImageReward)作为图片评分，感谢原作者。

# Input types

## Required

- images
    - 图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- prompt
    - 可选输入。将prompt在此输入将作为依据判定其与图片的符合程度。
    - Comfy dtype: STRING
    - Python dtype: str

- output_num
    - 输出的图片数量。此数值应小于图片批量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types

- images
    - 按评分顺序从高到低输出的批量图片。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

- obsolete_images
    - 淘汰的图片。同样按评分顺序从高到低输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```python
class ImageRewardFilter:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(self):
        return {
            "required": {
                "images": ("IMAGE", ),
                "prompt": ("STRING", {"multiline": False}),
                "output_num": ("INT", {"default": 3, "min": 1, "max": 999999, "step": 1}),
            },
            "optional": {
            }
        }

    RETURN_TYPES = ("IMAGE", "IMAGE",)
    RETURN_NAMES = ("images", 'obsolete_images',)
    FUNCTION = 'image_reward_filter'
    CATEGORY = '😺dzNodes/LayerUtility'

    def image_reward_filter(self, images, prompt, output_num,):
        log(f"len(images)= {len(images)}, output_num={output_num}")
        if output_num > len(images):
            log(f"Error: {NODE_NAME} skipped, because 'output_num' is greater then input images.", message_type='error')
            return (images,)

        scores = []
        ret_images = []
        obsolete_images = []

        if not torch.cuda.is_available() :
            device = "cpu"
        else:
            device = "cuda"

        import ImageReward as RM
        reward_model = RM.load("ImageReward-v1.0")
        reward_model = reward_model.to(device=device)

        with torch.no_grad():
            for i in range(len(images)):
                score = reward_model.score(prompt, tensor2pil(images[i]))
                scores.append(
                    {
                        "score":score,
                        "image_index":i
                    }
                )
        scores = sorted(scores, key=lambda s: s['score'], reverse=True)

        for i in range(len(images)):
            if i < output_num:
                log(f"{NODE_NAME} append image #{i}: {scores[i]['image_index']}, score = {scores[i]['score']}.")
                ret_images.append(images[scores[i]['image_index']])
            else:
                log(f"{NODE_NAME} obsolete image #{i}: {scores[i]['image_index']}, score = {scores[i]['score']}.")
                obsolete_images.append(images[scores[i]['image_index']])

        log(f"{NODE_NAME} Processed {len(ret_images)} image(s).", message_type='finish')

        return (ret_images, obsolete_images,)
```