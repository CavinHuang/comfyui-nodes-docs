# Documentation
- Class name: InstantIDAttentionPatch
- Category: InstantID
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_InstantID.git

InstantIDAttentionPatch是一个旨在增强神经网络模型中注意力机制的类，特别为图像处理任务定制。它与InstantID模型集成，以提高模型对图像中相关特征的聚焦能力，从而提高输出嵌入的质量。该节点抽象了注意力补丁的复杂性，并强调了模型特征检测和表示能力的总体增强。

# Input types
## Required
- instantid
    - instantid参数至关重要，因为它提供了注意力补丁操作所需的基础模型架构。它是应用注意力机制和特征增强的基础，直接影响节点在提炼模型输出方面的有效性。
    - Comfy dtype: INSTANTID
    - Python dtype: dict
- insightface
    - insightface参数对节点至关重要，因为它提供了面部分析组件，这对于图像数据处理至关重要。它使节点能够准确检测和分析面部特征，这是图像处理任务的关键方面。
    - Comfy dtype: FACEANALYSIS
    - Python dtype: object
- image
    - image参数对节点的运作至关重要，因为它引入了将被处理的原始图像数据。图像的质量和分辨率直接影响节点提取和利用相关特征的能力，从而影响图像处理任务的整体性能。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image
- model
    - model参数是节点将通过应用注意力补丁来增强的神经网络模型。它是一个关键组件，因为它决定了节点构建其特征增强和注意力机制的基础。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- weight
    - weight参数是一个浮点值，用于调整注意力补丁对模型输出的影响。它很重要，因为它允许对模型对特定特征的关注进行微调，直接影响提取特征的质量和相关性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_at
    - start_at参数定义了注意力补丁开始施加影响的初始点。它很重要，因为它设置了特征增强过程的起始条件，影响模型最初如何聚焦输入图像。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - end_at参数指定了注意力补丁结束其影响的最终点。它很重要，因为它决定了特征增强的结束条件，影响模型对输入图像的持续关注。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- noise
    - noise参数在注意力补丁的操作中引入了一定程度的随机性，这有助于多样化模型的特征提取。它通过在特征表示中引入变异性，增强了模型的鲁棒性和创造力。
    - Comfy dtype: FLOAT
    - Python dtype: float
- mask
    - 当提供mask参数时，它允许有选择地将注意力补丁应用于图像的特定区域。它通过确定在特征增强过程中哪些图像区域被优先考虑或忽略，影响节点的操作。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- model
    - 输出模型是应用注意力补丁后增强的神经网络。它代表了节点努力提炼和集中模型特征提取能力的成果，提供了对输入图像更准确和细致的表示。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- FACE_EMBEDS
    - FACE_EMBEDS输出由输入图像中提取的面部嵌入组成，这些嵌入已通过注意力补丁得到增强。这些嵌入捕捉了面部数据的基本特征，提供了丰富而详细的表示，可用于进一步的分析或比较。
    - Comfy dtype: FACE_EMBEDS
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class InstantIDAttentionPatch:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'instantid': ('INSTANTID',), 'insightface': ('FACEANALYSIS',), 'image': ('IMAGE',), 'model': ('MODEL',), 'weight': ('FLOAT', {'default': 1.0, 'min': -1.0, 'max': 3.0, 'step': 0.01}), 'start_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_at': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'noise': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.1})}, 'optional': {'mask': ('MASK',)}}
    RETURN_TYPES = ('MODEL', 'FACE_EMBEDS')
    FUNCTION = 'patch_attention'
    CATEGORY = 'InstantID'

    def patch_attention(self, instantid, insightface, image, model, weight, start_at, end_at, noise=0.0, mask=None):
        self.dtype = torch.float16 if comfy.model_management.should_use_fp16() else torch.float32
        self.device = comfy.model_management.get_torch_device()
        output_cross_attention_dim = instantid['ip_adapter']['1.to_k_ip.weight'].shape[1]
        is_sdxl = output_cross_attention_dim == 2048
        cross_attention_dim = 1280
        clip_extra_context_tokens = 16
        face_embed = extractFeatures(insightface, image)
        if face_embed is None:
            raise Exception('Reference Image: No face detected.')
        clip_embed = face_embed
        if clip_embed.shape[0] > 1:
            clip_embed = torch.mean(clip_embed, dim=0).unsqueeze(0)
        if noise > 0:
            seed = int(torch.sum(clip_embed).item()) % 1000000007
            torch.manual_seed(seed)
            clip_embed_zeroed = noise * torch.rand_like(clip_embed)
        else:
            clip_embed_zeroed = torch.zeros_like(clip_embed)
        clip_embeddings_dim = face_embed.shape[-1]
        self.instantid = InstantID(instantid, cross_attention_dim=cross_attention_dim, output_cross_attention_dim=output_cross_attention_dim, clip_embeddings_dim=clip_embeddings_dim, clip_extra_context_tokens=clip_extra_context_tokens)
        self.instantid.to(self.device, dtype=self.dtype)
        (image_prompt_embeds, uncond_image_prompt_embeds) = self.instantid.get_image_embeds(clip_embed.to(self.device, dtype=self.dtype), clip_embed_zeroed.to(self.device, dtype=self.dtype))
        image_prompt_embeds = image_prompt_embeds.to(self.device, dtype=self.dtype)
        uncond_image_prompt_embeds = uncond_image_prompt_embeds.to(self.device, dtype=self.dtype)
        if weight == 0:
            return (model, {'cond': image_prompt_embeds, 'uncond': uncond_image_prompt_embeds})
        work_model = model.clone()
        sigma_start = work_model.model.model_sampling.percent_to_sigma(start_at)
        sigma_end = work_model.model.model_sampling.percent_to_sigma(end_at)
        if mask is not None:
            mask = mask.to(self.device)
        patch_kwargs = {'number': 0, 'weight': weight, 'ipadapter': self.instantid, 'cond': image_prompt_embeds, 'uncond': uncond_image_prompt_embeds, 'mask': mask, 'sigma_start': sigma_start, 'sigma_end': sigma_end, 'weight_type': 'original'}
        if not is_sdxl:
            for id in [1, 2, 4, 5, 7, 8]:
                _set_model_patch_replace(work_model, patch_kwargs, ('input', id))
                patch_kwargs['number'] += 1
            for id in [3, 4, 5, 6, 7, 8, 9, 10, 11]:
                _set_model_patch_replace(work_model, patch_kwargs, ('output', id))
                patch_kwargs['number'] += 1
            _set_model_patch_replace(work_model, patch_kwargs, ('middle', 0))
        else:
            for id in [4, 5, 7, 8]:
                block_indices = range(2) if id in [4, 5] else range(10)
                for index in block_indices:
                    _set_model_patch_replace(work_model, patch_kwargs, ('input', id, index))
                    patch_kwargs['number'] += 1
            for id in range(6):
                block_indices = range(2) if id in [3, 4, 5] else range(10)
                for index in block_indices:
                    _set_model_patch_replace(work_model, patch_kwargs, ('output', id, index))
                    patch_kwargs['number'] += 1
            for index in range(10):
                _set_model_patch_replace(work_model, patch_kwargs, ('middle', 0, index))
                patch_kwargs['number'] += 1
        return (work_model, {'cond': image_prompt_embeds, 'uncond': uncond_image_prompt_embeds})
```