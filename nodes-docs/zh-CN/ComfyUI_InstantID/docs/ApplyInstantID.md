# Documentation
- Class name: ApplyInstantID
- Category: InstantID
- Output node: False
- Repo Ref: https://github.com/cubiq/ComfyUI_InstantID.git

ApplyInstantID节点旨在整合面部识别和图像处理功能，利用先进的机器学习模型提高输入图像的质量和相关性。它通过对输入图像应用一系列变换，并根据特定面部特征对模型进行条件化，最终提高输出的准确性和细节。

# Input types
## Required
- instantid
    - instantid参数对节点的运行至关重要，因为它提供了处理所需的必要面部识别数据和模型结构。没有它，节点无法执行其预期的面部分析和增强任务。
    - Comfy dtype: INSTANTID
    - Python dtype: Dict[str, Any]
- insightface
    - insightface参数对节点至关重要，因为它包含了用于从输入图像中提取和处理面部特征的面部分析模型。此参数直接影响面部特征检测的准确性和质量。
    - Comfy dtype: FACEANALYSIS
    - Python dtype: Any
- control_net
    - control_net参数是节点的一个关键组成部分，它允许节点管理和调整应用于模型的条件化过程。它有助于微调输出以满足特定要求，并提高面部特征增强的整体性能。
    - Comfy dtype: CONTROL_NET
    - Python dtype: Any
- image
    - image参数是节点功能的基础，它作为面部特征提取和增强的输入。图像的质量和分辨率直接影响面部识别的有效性和最终输出。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or numpy.ndarray
- model
    - model参数是节点操作的核心，提供了执行面部特征分析和增强的基础机器学习模型。模型的选择和质量显著影响节点的性能和输出。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- positive
    - positive参数在节点的运行中起着至关重要的作用，通过提供正向条件数据来指导增强过程。它有助于完善面部特征，并确保输出符合期望的特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[Any, Dict[str, Any]]]
- negative
    - negative参数与positive参数同等重要，提供负向条件数据，帮助节点避免输出中不希望的特征。它有助于面部特征增强过程的精确性。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[Any, Dict[str, Any]]]
## Optional
- weight
    - weight参数影响应用于模型的条件强度，影响最终输出中期望特征的显著程度。它提供了一种控制输入条件与模型固有能力之间平衡的方法。
    - Comfy dtype: FLOAT
    - Python dtype: float
- start_at
    - start_at参数定义了条件过程的起点，决定了面部特征增强的开始时间。它对于控制特征增强的时间和顺序至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - end_at参数设置了条件过程的终点，决定了面部特征增强的结束时间。它与start_at协同工作，确保面部特征增强的间隔受控且精确。
    - Comfy dtype: FLOAT
    - Python dtype: float
- image_kps
    - image_kps参数提供面部特征的关键点数据，用于指导模型准确定位和增强特定的面部元素。它有助于提高面部特征增强的精确度和准确性。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image or numpy.ndarray
- mask
    - mask参数用于对面部特征增强过程应用特定的限制或聚焦区域。它允许有针对性的调整和改进，确保增强只应用于图像的期望区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- MODEL
    - 输出模型是经过输入数据条件化以提高面部特征提取的准确性和质量的增强机器学习模型。它代表了节点处理的成果，准备用于进一步的使用或分析。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- positive
    - 正面输出代表了成功增强和条件化的正面面部特征，可以作为后续过程的参考或输入。它是节点输出的关键部分，表明面部特征增强已成功应用。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[Any, Dict[str, Any]]]
- negative
    - 负面输出包括已调整的条件化负面面部特征，以防止不希望的特征出现在最终输出中。它反映了节点对输出进行细化和控制以满足特定要求的能力。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[Any, Dict[str, Any]]]

# Usage tips
- Infra type: GPU

# Source code
```
class ApplyInstantID:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'instantid': ('INSTANTID',), 'insightface': ('FACEANALYSIS',), 'control_net': ('CONTROL_NET',), 'image': ('IMAGE',), 'model': ('MODEL',), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'weight': ('FLOAT', {'default': 0.8, 'min': 0.0, 'max': 5.0, 'step': 0.01}), 'start_at': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'end_at': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001})}, 'optional': {'image_kps': ('IMAGE',), 'mask': ('MASK',)}}
    RETURN_TYPES = ('MODEL', 'CONDITIONING', 'CONDITIONING')
    RETURN_NAMES = ('MODEL', 'positive', 'negative')
    FUNCTION = 'apply_instantid'
    CATEGORY = 'InstantID'

    def apply_instantid(self, instantid, insightface, control_net, image, model, positive, negative, start_at, end_at, weight=0.8, ip_weight=None, cn_strength=None, noise=0.35, image_kps=None, mask=None):
        self.dtype = torch.float16 if comfy.model_management.should_use_fp16() else torch.float32
        self.device = comfy.model_management.get_torch_device()
        ip_weight = weight if ip_weight is None else ip_weight
        cn_strength = weight if cn_strength is None else cn_strength
        output_cross_attention_dim = instantid['ip_adapter']['1.to_k_ip.weight'].shape[1]
        is_sdxl = output_cross_attention_dim == 2048
        cross_attention_dim = 1280
        clip_extra_context_tokens = 16
        face_embed = extractFeatures(insightface, image)
        if face_embed is None:
            raise Exception('Reference Image: No face detected.')
        face_kps = extractFeatures(insightface, image_kps if image_kps is not None else image[0].unsqueeze(0), extract_kps=True)
        if face_kps is None:
            face_kps = torch.zeros_like(image) if image_kps is None else image_kps
            print(f'\x1b[33mWARNING: No face detected in the keypoints image!\x1b[0m')
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
        work_model = model.clone()
        sigma_start = work_model.model.model_sampling.percent_to_sigma(start_at)
        sigma_end = work_model.model.model_sampling.percent_to_sigma(end_at)
        if mask is not None:
            mask = mask.to(self.device)
        patch_kwargs = {'number': 0, 'weight': ip_weight, 'ipadapter': self.instantid, 'cond': image_prompt_embeds, 'uncond': uncond_image_prompt_embeds, 'mask': mask, 'sigma_start': sigma_start, 'sigma_end': sigma_end, 'weight_type': 'original'}
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
        if mask is not None and len(mask.shape) < 3:
            mask = mask.unsqueeze(0)
        cnets = {}
        cond_uncond = []
        is_cond = True
        for conditioning in [positive, negative]:
            c = []
            for t in conditioning:
                d = t[1].copy()
                prev_cnet = d.get('control', None)
                if prev_cnet in cnets:
                    c_net = cnets[prev_cnet]
                else:
                    c_net = control_net.copy().set_cond_hint(face_kps.movedim(-1, 1), cn_strength, (start_at, end_at))
                    c_net.set_previous_controlnet(prev_cnet)
                    cnets[prev_cnet] = c_net
                d['control'] = c_net
                d['control_apply_to_uncond'] = False
                d['cross_attn_controlnet'] = image_prompt_embeds.to(comfy.model_management.intermediate_device()) if is_cond else uncond_image_prompt_embeds.to(comfy.model_management.intermediate_device())
                if mask is not None and is_cond:
                    d['mask'] = mask
                    d['set_area_to_bounds'] = False
                n = [t[0], d]
                c.append(n)
            cond_uncond.append(c)
            is_cond = False
        return (work_model, cond_uncond[0], cond_uncond[1])
```