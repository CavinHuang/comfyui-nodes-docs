# Documentation
- Class name: OOTDGenerate
- Category: OOTD
- Output node: False
- Repo Ref: https://github.com/AuroBit/ComfyUI-OOTDiffusion.git

该节点旨在根据输入的图像和类别合成服装，利用扩散模型进行创意时尚生成。它旨在为用户提供多样化的、与上下文相关的、风格一致的服装选项。

# Input types
## Required
- pipe
    - pipe参数至关重要，它封装了用于生成服装的扩散模型。它是节点功能的主干，决定了生成的服装的质量和类型。
    - Comfy dtype: MODEL
    - Python dtype: OOTDiffusion
- cloth_image
    - cloth_image参数作为生成服装的基础。它对于节点理解上下文并合成与所提供图像视觉一致的服装至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- model_image
    - model_image参数用于提供生成服装中人物形象的模板。这对于保持服装的结构完整性和与人体形态的真实比例非常重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- seed
    - seed参数在生成服装的过程中引入随机性，允许出现多种结果。这对于寻求独特且不重复的时尚选项的用户来说非常关键。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - steps参数决定了扩散过程中使用的迭代次数。它影响最终生成服装的细节和精细程度，更多的步骤会带来更加细腻的结果。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数调整生成过程中使用的图像比例，这影响生成服装的分辨率和清晰度。它是实现高质量视觉效果的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- category
    - category参数指定要生成的服装类型，指导节点生成与选定时尚类别相符的服装。它对于确保生成内容的相关性和适当性至关重要。
    - Comfy dtype: LIST
    - Python dtype: List[str]

# Output types
- image
    - image输出展示了最终生成的服装，展示了基于输入的时尚元素的创意合成。它是节点操作的主要结果，代表了服装概念的实现。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- image_masked
    - image_masked输出提供了一个应用了特定时尚元素遮罩的生成服装版本。这个输出对于需要对生成内容进行详细控制的用户来说非常重要，允许进一步的定制和操作。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class OOTDGenerate:
    display_name = 'OOTDiffusion Generate'

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'pipe': ('MODEL',), 'cloth_image': ('IMAGE',), 'model_image': ('IMAGE',), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 2.0, 'min': 0.0, 'max': 14.0, 'step': 0.1, 'round': 0.01}), 'category': (list(_category_readable.keys()),)}}
    RETURN_TYPES = ('IMAGE', 'IMAGE')
    RETURN_NAMES = ('image', 'image_masked')
    FUNCTION = 'generate'
    CATEGORY = 'OOTD'

    def generate(self, pipe: OOTDiffusion, cloth_image, model_image, category, seed, steps, cfg):
        category = _category_readable[category]
        if pipe.model_type == 'hd' and category != 'upperbody':
            raise ValueError('Half body (hd) model type can only be used with upperbody category')
        model_image = model_image.squeeze(0)
        model_image = model_image.permute((2, 0, 1))
        model_image = to_pil_image(model_image)
        if model_image.size != (768, 1024):
            print(f'Inconsistent model_image size {model_image.size} != (768, 1024)')
        model_image = model_image.resize((768, 1024))
        cloth_image = cloth_image.squeeze(0)
        cloth_image = cloth_image.permute((2, 0, 1))
        cloth_image = to_pil_image(cloth_image)
        if cloth_image.size != (768, 1024):
            print(f'Inconsistent cloth_image size {cloth_image.size} != (768, 1024)')
        cloth_image = cloth_image.resize((768, 1024))
        (model_parse, _) = pipe.parsing_model(model_image.resize((384, 512)))
        keypoints = pipe.openpose_model(model_image.resize((384, 512)))
        (mask, mask_gray) = get_mask_location(pipe.model_type, _category_get_mask_input[category], model_parse, keypoints, width=384, height=512)
        mask = mask.resize((768, 1024), Image.NEAREST)
        mask_gray = mask_gray.resize((768, 1024), Image.NEAREST)
        masked_vton_img = Image.composite(mask_gray, model_image, mask)
        images = pipe(category=category, image_garm=cloth_image, image_vton=masked_vton_img, mask=mask, image_ori=model_image, num_samples=1, num_steps=steps, image_scale=cfg, seed=seed)
        output_image = to_tensor(images[0])
        output_image = output_image.permute((1, 2, 0)).unsqueeze(0)
        masked_vton_img = masked_vton_img.convert('RGB')
        masked_vton_img = to_tensor(masked_vton_img)
        masked_vton_img = masked_vton_img.permute((1, 2, 0)).unsqueeze(0)
        return (output_image, masked_vton_img)
```