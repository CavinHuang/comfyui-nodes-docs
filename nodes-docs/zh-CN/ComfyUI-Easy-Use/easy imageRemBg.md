# Documentation
- Class name: imageRemBg
- Category: EasyUse/Image
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

imageRemBg节点旨在从图像中移除背景，为进一步使用或展示提供简化且干净的前景。它通过应用一个针对背景移除优化的深度学习模型来实现这一点，确保输出图像保留其主要主题，同时尽量减少背景干扰。

# Input types
## Required
- images
    - 输入图像参数对于节点的操作至关重要，因为它定义了将要应用背景移除过程的数据。这些图像的质量和格式直接影响背景移除的效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- rem_mode
    - rem_mode参数指定节点要使用的移除模式。它至关重要，因为它决定了用于背景分离的算法方法，影响最终输出的准确性。
    - Comfy dtype: STRING
    - Python dtype: str
- image_output
    - image_output参数指示处理后如何处理生成的图像。它可以隐藏它们、预览它们、保存它们，或者既隐藏又保存，根据用户需求提供管理输出的灵活性。
    - Comfy dtype: COMBO['Hide', 'Preview', 'Save', 'Hide/Save']
    - Python dtype: str
- save_prefix
    - 当用户选择保存处理后的图像时，使用save_prefix参数。它为保存的文件提供基础名称，这对于组织和识别输出图像很重要。
    - Comfy dtype: STRING
    - Python dtype: str
- prompt
    - 可选的prompt参数可用于为节点提供额外的上下文或指令，这对于某些操作或根据特定标准细化输出可能是必要的。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - extra_pnginfo参数用于包含节点操作可能需要的任何额外信息。这可能是元数据或其他影响处理或输出的相关细节。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: str

# Output types
- image
    - 图像输出参数代表移除背景后的处理图像。它是节点的主要输出，具有重要意义，因为反映了背景移除过程的结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 掩码输出参数提供了在背景移除过程中生成的二进制掩码。它有助于在图像中将前景对象与背景隔离开来。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class imageRemBg:

    @classmethod
    def INPUT_TYPES(self):
        return {'required': {'images': ('IMAGE',), 'rem_mode': (('RMBG-1.4',),), 'image_output': (['Hide', 'Preview', 'Save', 'Hide/Save'], {'default': 'Preview'}), 'save_prefix': ('STRING', {'default': 'ComfyUI'})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ('IMAGE', 'MASK')
    RETURN_NAMES = ('image', 'mask')
    FUNCTION = 'remove'
    OUTPUT_NODE = True
    CATEGORY = 'EasyUse/Image'

    def remove(self, rem_mode, images, image_output, save_prefix, prompt=None, extra_pnginfo=None):
        if rem_mode == 'RMBG-1.4':
            model_url = REMBG_MODELS[rem_mode]['model_url']
            suffix = model_url.split('.')[-1]
            model_path = get_local_filepath(model_url, REMBG_DIR, rem_mode + '.' + suffix)
            net = BriaRMBG()
            device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
            net.load_state_dict(torch.load(model_path, map_location=device))
            net.to(device)
            net.eval()
            model_input_size = [1024, 1024]
            new_images = list()
            masks = list()
            for image in images:
                orig_im = tensor2pil(image)
                (w, h) = orig_im.size
                image = preprocess_image(orig_im, model_input_size).to(device)
                result = net(image)
                result_image = postprocess_image(result[0][0], (h, w))
                mask_im = Image.fromarray(result_image)
                new_im = Image.new('RGBA', mask_im.size, (0, 0, 0, 0))
                new_im.paste(orig_im, mask=mask_im)
                new_images.append(pil2tensor(new_im))
                masks.append(pil2tensor(mask_im))
            new_images = torch.cat(new_images, dim=0)
            masks = torch.cat(masks, dim=0)
            results = easySave(new_images, save_prefix, image_output, prompt, extra_pnginfo)
            if image_output in ('Hide', 'Hide/Save'):
                return {'ui': {}, 'result': (new_images, masks)}
            return {'ui': {'images': results}, 'result': (new_images, masks)}
        else:
            return (None, None)
```