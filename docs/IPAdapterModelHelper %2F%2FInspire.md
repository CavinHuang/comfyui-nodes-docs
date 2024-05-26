# Documentation
- Class name: IPAdapterModelHelper
- Category: InspirePack/models
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

IPAdapterModelHelper节点是InspirePack套件中的一个关键组件，它促进了各种模型和预设的无缝集成和应用。它巧妙地管理了模型加载的复杂性并确保了兼容性，使用户能够以最小的摩擦力利用不同模型的强大功能。该节点旨在简化模型使用过程，为访问多样化功能提供统一的接口。

# Input types
## Required
- model
    - 模型参数对于节点的操作至关重要，因为它定义了要使用的核心技术模型。它显著影响节点的执行和产生的结果质量，使其成为节点功能的一个基本方面。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - clip参数通过提供图像处理所需的上下文，在节点的功能中发挥着重要作用。它对于节点根据输入数据生成准确和相关的输出至关重要。
    - Comfy dtype: CLIP
    - Python dtype: torch.Tensor
- preset
    - 预设参数允许用户选择预定义的设置，将节点的行为调整为特定用例。它是根据用户需求定制节点操作的关键元素。
    - Comfy dtype: COMBO[list(model_preset.keys())]
    - Python dtype: str
- lora_strength_model
    - lora_strength_model参数调整LoRA模型对节点输出的影响。它是一个重要的调整因素，可以显著影响最终结果，允许对节点行为进行细粒度控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lora_strength_clip
    - lora_strength_clip参数微调CLIP模型对节点处理的影响。对于需要控制CLIP模型影响与其他因素之间平衡的用户来说，它是一个关键参数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- insightface_provider
    - insightface_provider参数指定用于InsightFace模型的后端，这对于面部识别任务至关重要。这是一个重要的选择，可以影响节点的性能和与用户系统的兼容性。
    - Comfy dtype: COMBO[['CPU', 'CUDA', 'ROCM']]
    - Python dtype: str
- cache_mode
    - cache_mode参数确定节点的缓存策略，可以通过减少冗余操作来提高性能。对于优化节点的效率，这是一个重要的考虑因素。
    - Comfy dtype: COMBO[['insightface only', 'clip_vision only', 'all', 'none']]
    - Python dtype: str
- unique_id
    - unique_id参数用于在系统中跟踪和识别节点，这对于调试和管理节点的多个实例特别有用。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str

# Output types
- IPADAPTER_PIPE
    - IPADAPTER_PIPE输出是一个复合结构，封装了处理后的数据和模型，为进一步分析或利用提供了全面的流水线。
    - Comfy dtype: IPADAPTER_PIPE
    - Python dtype: Tuple[torch.nn.Module, torch.Tensor, torch.Tensor, Any, Callable[[torch.nn.Module], torch.nn.Module]]
- IPADAPTER
    - IPADAPTER输出代表已加载的IPAdapter模型，可用于后续图像处理任务中的应用。
    - Comfy dtype: IPADAPTER
    - Python dtype: torch.nn.Module
- CLIP_VISION
    - CLIP_VISION输出提供了已加载的CLIP模型，这对于从图像生成上下文嵌入至关重要。
    - Comfy dtype: CLIP_VISION
    - Python dtype: torch.Tensor
- INSIGHTFACE
    - INSIGHTFACE输出提供了InsightFace模型，该模型专门用于节点操作中的面部识别和分析。
    - Comfy dtype: INSIGHTFACE
    - Python dtype: Any
- MODEL
    - MODEL输出指的是已被节点增强或修改的主要模型，可供进一步处理或直接应用。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- CLIP
    - CLIP输出表示处理过的CLIP数据，可用于涉及图像和文本交互的各种下游任务。
    - Comfy dtype: CLIP
    - Python dtype: torch.Tensor
- insightface_cache_key
    - insightface_cache_key输出是用于缓存InsightFace模型的唯一标识符，它优化了节点重复使用时的性能。
    - Comfy dtype: STRING
    - Python dtype: str
- clip_vision_cache_key
    - clip_vision_cache_key输出为CLIP Vision模型提供了一个用于缓存的唯一标识符，这有助于提高节点在重复任务中的效率。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: GPU

# Source code
```
class IPAdapterModelHelper:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'clip': ('CLIP',), 'preset': (list(model_preset.keys()),), 'lora_strength_model': ('FLOAT', {'default': 1.0, 'min': -20.0, 'max': 20.0, 'step': 0.01}), 'lora_strength_clip': ('FLOAT', {'default': 1.0, 'min': -20.0, 'max': 20.0, 'step': 0.01}), 'insightface_provider': (['CPU', 'CUDA', 'ROCM'],), 'cache_mode': (['insightface only', 'clip_vision only', 'all', 'none'], {'default': 'insightface only'})}, 'hidden': {'unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('IPADAPTER_PIPE', 'IPADAPTER', 'CLIP_VISION', 'INSIGHTFACE', 'MODEL', 'CLIP', 'STRING', 'STRING')
    RETURN_NAMES = ('IPADAPTER_PIPE', 'IPADAPTER', 'CLIP_VISION', 'INSIGHTFACE', 'MODEL', 'CLIP', 'insightface_cache_key', 'clip_vision_cache_key')
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/models'

    def doit(self, model, clip, preset, lora_strength_model, lora_strength_clip, insightface_provider, cache_mode='none', unique_id=None):
        if 'IPAdapterApply' not in nodes.NODE_CLASS_MAPPINGS:
            utils.try_install_custom_node('https://github.com/cubiq/ComfyUI_IPAdapter_plus', "To use 'IPAdapterModelHelper' node, 'ComfyUI IPAdapter Plus' extension is required.")
            raise Exception(f"[ERROR] To use IPAdapterModelHelper, you need to install 'ComfyUI IPAdapter Plus'")
        is_sdxl_preset = 'SDXL' in preset
        is_sdxl_model = isinstance(clip.tokenizer, sdxl_clip.SDXLTokenizer)
        if is_sdxl_preset != is_sdxl_model:
            server.PromptServer.instance.send_sync('inspire-node-output-label', {'node_id': unique_id, 'output_idx': 1, 'label': 'IPADAPTER (fail)'})
            server.PromptServer.instance.send_sync('inspire-node-output-label', {'node_id': unique_id, 'output_idx': 2, 'label': 'CLIP_VISION (fail)'})
            server.PromptServer.instance.send_sync('inspire-node-output-label', {'node_id': unique_id, 'output_idx': 3, 'label': 'INSIGHTFACE (fail)'})
            server.PromptServer.instance.send_sync('inspire-node-output-label', {'node_id': unique_id, 'output_idx': 4, 'label': 'MODEL (fail)'})
            server.PromptServer.instance.send_sync('inspire-node-output-label', {'node_id': unique_id, 'output_idx': 5, 'label': 'CLIP (fail)'})
            print(f'[ERROR] IPAdapterModelHelper: You cannot mix SDXL and SD1.5 in the checkpoint and IPAdapter.')
            raise Exception('[ERROR] You cannot mix SDXL and SD1.5 in the checkpoint and IPAdapter.')
        (ipadapter, clipvision, lora, is_insightface) = model_preset[preset]
        (ipadapter, ok1) = lookup_model('ipadapter', ipadapter)
        (clipvision, ok2) = lookup_model('clip_vision', clipvision)
        (lora, ok3) = lookup_model('loras', lora)
        if ok1 == 'OK':
            ok1 = 'IPADAPTER'
        else:
            ok1 = f'IPADAPTER ({ok1})'
        if ok2 == 'OK':
            ok2 = 'CLIP_VISION'
        else:
            ok2 = f'CLIP_VISION ({ok2})'
        server.PromptServer.instance.send_sync('inspire-node-output-label', {'node_id': unique_id, 'output_idx': 1, 'label': ok1})
        server.PromptServer.instance.send_sync('inspire-node-output-label', {'node_id': unique_id, 'output_idx': 2, 'label': ok2})
        if ok3 == 'FAIL':
            server.PromptServer.instance.send_sync('inspire-node-output-label', {'node_id': unique_id, 'output_idx': 4, 'label': 'MODEL (fail)'})
            server.PromptServer.instance.send_sync('inspire-node-output-label', {'node_id': unique_id, 'output_idx': 5, 'label': 'CLIP (fail)'})
        else:
            server.PromptServer.instance.send_sync('inspire-node-output-label', {'node_id': unique_id, 'output_idx': 4, 'label': 'MODEL'})
            server.PromptServer.instance.send_sync('inspire-node-output-label', {'node_id': unique_id, 'output_idx': 5, 'label': 'CLIP'})
        if ok1 == 'FAIL' or ok2 == 'FAIL' or ok3 == 'FAIL':
            raise Exception('ERROR: Failed to load several models in IPAdapterModelHelper.')
        if ipadapter is not None:
            ipadapter = nodes.NODE_CLASS_MAPPINGS['IPAdapterModelLoader']().load_ipadapter_model(ipadapter_file=ipadapter)[0]
        ccache_key = ''
        if clipvision is not None:
            if cache_mode in ['clip_vision only', 'all']:
                ccache_key = clipvision
                if ccache_key not in backend_support.cache:
                    backend_support.cache[ccache_key] = (False, nodes.CLIPVisionLoader().load_clip(clip_name=clipvision)[0])
                clipvision = backend_support.cache[ccache_key][1]
            else:
                clipvision = nodes.CLIPVisionLoader().load_clip(clip_name=clipvision)[0]
        if lora is not None:
            (model, clip) = nodes.LoraLoader().load_lora(model=model, clip=clip, lora_name=lora, strength_model=lora_strength_model, strength_clip=lora_strength_clip)

            def f(x):
                return nodes.LoraLoader().load_lora(model=x, clip=clip, lora_name=lora, strength_model=lora_strength_model, strength_clip=lora_strength_clip)
            lora_loader = f
        else:

            def f(x):
                return x
            lora_loader = f
        icache_key = ''
        if is_insightface:
            if cache_mode in ['insightface only', 'all']:
                icache_key = 'insightface-' + insightface_provider
                if icache_key not in backend_support.cache:
                    backend_support.cache[icache_key] = (False, nodes.NODE_CLASS_MAPPINGS['InsightFaceLoader']().load_insight_face(insightface_provider)[0])
                insightface = backend_support.cache[icache_key][1]
            else:
                insightface = nodes.NODE_CLASS_MAPPINGS['InsightFaceLoader']().load_insight_face(insightface_provider)[0]
            server.PromptServer.instance.send_sync('inspire-node-output-label', {'node_id': unique_id, 'output_idx': 3, 'label': 'INSIGHTFACE'})
        else:
            insightface = None
            server.PromptServer.instance.send_sync('inspire-node-output-label', {'node_id': unique_id, 'output_idx': 3, 'label': 'INSIGHTFACE (N/A)'})
        pipe = (ipadapter, model, clipvision, insightface, lora_loader)
        return (pipe, ipadapter, clipvision, insightface, model, clip, icache_key, ccache_key)
```