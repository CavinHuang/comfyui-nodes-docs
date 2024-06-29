# Documentation
- Class name: WAS_CLIPSeg_Batch
- Category: WAS Suite/Image/Masking
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_CLIPSeg_Batch节点的CLIPSeg_images方法旨在根据文本提示执行图像分割。它利用CLIPSeg模型生成与图像中描述的实体相对应的掩码。该节点能够处理多个图像和文本，为需要理解视觉和文本输入的语义内容的复杂分割任务提供了强大的解决方案。

# Input types
## Required
- image_a
    - image_a参数是分割过程所需的主要图像输入。它至关重要，因为它直接影响模型理解和分割图像中所需元素的能力。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor
- text_a
    - text_a参数提供了引导分割模型识别和分割图像特定部分的文本提示。它的重要性在于它能够通过专注于所提供的文本描述来细化分割过程。
    - Comfy dtype: STRING
    - Python dtype: str
- image_b
    - image_b参数是与image_a一起使用的次要图像输入，可用于更复杂的分割场景。它允许考虑额外的视觉上下文，从而增强分割结果。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor
- text_b
    - text_b参数是补充text_a的另一个文本提示，为分割模型提供替代或额外的指导。它增强了节点处理多样化分割任务的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- image_c
    - 可选的image_c参数允许在分割过程中包含另一个图像。为了使模型能够正确处理，它的尺寸应该与image_a相同。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor
- text_c
    - 可选的text_c参数扩展了分割模型的文本指导，提供了进一步的描述，可以帮助完成更复杂的分割任务。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- IMAGES_BATCH
    - IMAGES_BATCH输出包含由节点处理的输入图像批次。它很重要，因为它允许在分割后审查和进一步分析原始图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- MASKS_BATCH
    - MASKS_BATCH输出提供了与输入图像中感兴趣区域对应的生成掩码。这些掩码对于隔离和进一步处理文本提示描述的特定部分至关重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- MASK_IMAGES_BATCH
    - MASK_IMAGES_BATCH输出包括已经被掩码处理的图像，根据文本提示突出显示了分割区域。它是可视化分割过程结果的重要输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class WAS_CLIPSeg_Batch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image_a': ('IMAGE',), 'image_b': ('IMAGE',), 'text_a': ('STRING', {'default': '', 'multiline': False}), 'text_b': ('STRING', {'default': '', 'multiline': False})}, 'optional': {'image_c': ('IMAGE',), 'image_d': ('IMAGE',), 'image_e': ('IMAGE',), 'image_f': ('IMAGE',), 'text_c': ('STRING', {'default': '', 'multiline': False}), 'text_d': ('STRING', {'default': '', 'multiline': False}), 'text_e': ('STRING', {'default': '', 'multiline': False}), 'text_f': ('STRING', {'default': '', 'multiline': False})}}
    RETURN_TYPES = ('IMAGE', 'MASK', 'IMAGE')
    RETURN_NAMES = ('IMAGES_BATCH', 'MASKS_BATCH', 'MASK_IMAGES_BATCH')
    FUNCTION = 'CLIPSeg_images'
    CATEGORY = 'WAS Suite/Image/Masking'

    def CLIPSeg_images(self, image_a, image_b, text_a, text_b, image_c=None, image_d=None, image_e=None, image_f=None, text_c=None, text_d=None, text_e=None, text_f=None):
        from transformers import CLIPSegProcessor, CLIPSegForImageSegmentation
        import torch.nn.functional as F
        images_pil = [tensor2pil(image_a), tensor2pil(image_b)]
        if image_c is not None:
            if image_c.shape[-2:] != image_a.shape[-2:]:
                cstr('Size of image_c is different from image_a.').error.print()
                return
            images_pil.append(tensor2pil(image_c))
        if image_d is not None:
            if image_d.shape[-2:] != image_a.shape[-2:]:
                cstr('Size of image_d is different from image_a.').error.print()
                return
            images_pil.append(tensor2pil(image_d))
        if image_e is not None:
            if image_e.shape[-2:] != image_a.shape[-2:]:
                cstr('Size of image_e is different from image_a.').error.print()
                return
            images_pil.append(tensor2pil(image_e))
        if image_f is not None:
            if image_f.shape[-2:] != image_a.shape[-2:]:
                cstr('Size of image_f is different from image_a.').error.print()
                return
            images_pil.append(tensor2pil(image_f))
        images_tensor = [torch.from_numpy(np.array(img.convert('RGB')).astype(np.float32) / 255.0).unsqueeze(0) for img in images_pil]
        images_tensor = torch.cat(images_tensor, dim=0)
        prompts = [text_a, text_b]
        if text_c:
            prompts.append(text_c)
        if text_d:
            prompts.append(text_d)
        if text_e:
            prompts.append(text_e)
        if text_f:
            prompts.append(text_f)
        cache = os.path.join(MODELS_DIR, 'clipseg')
        inputs = CLIPSegProcessor.from_pretrained('CIDAS/clipseg-rd64-refined', cache_dir=cache)
        model = CLIPSegForImageSegmentation.from_pretrained('CIDAS/clipseg-rd64-refined', cache_dir=cache)
        with torch.no_grad():
            result = model(**inputs(text=prompts, images=images_pil, padding=True, return_tensors='pt'))
        masks = []
        mask_images = []
        for (i, res) in enumerate(result.logits):
            tensor = torch.sigmoid(res)
            mask = 1.0 - (tensor - tensor.min()) / tensor.max()
            mask = mask.unsqueeze(0)
            mask = tensor2pil(mask).convert('L')
            mask = mask.resize(images_pil[0].size)
            mask_batch = pil2mask(mask)
            masks.append(mask_batch.unsqueeze(0).unsqueeze(1))
            mask_images.append(pil2tensor(ImageOps.invert(mask.convert('RGB'))).squeeze(0))
        masks_tensor = torch.cat(masks, dim=0)
        mask_images_tensor = torch.stack(mask_images, dim=0)
        del inputs, model, result, tensor, masks, mask_images, images_pil
        return (images_tensor, masks_tensor, mask_images_tensor)
```