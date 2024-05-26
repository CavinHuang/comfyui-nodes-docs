# Documentation
- Class name: LoraBlockInfo
- Category: InspirePack/LoraBlockWeight
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点类封装了从Lora模型中提取和组织信息的过程，这是理解模型结构和功能的关键组成部分。它提供了模型中不同类型块的全面概述，例如输入块、中间块、输出块和文本块，以及它们各自的数量和关联。这种高级功能有助于分析和优化模型的架构。

# Input types
## Required
- model
    - 模型参数是必不可少的，因为它为节点执行分析提供了基础。它是节点用来提取和组织块信息的主要数据源。
    - Comfy dtype: MODEL
    - Python dtype: Any
- clip
    - clip参数对于完善模型的块信息至关重要。它有助于准确映射键并增强整体提取过程。
    - Comfy dtype: CLIP
    - Python dtype: Any
- lora_name
    - lora_name参数指定了要分析的Lora模型。它是一个关键的输入，指导节点到正确的数据源进行块提取。
    - Comfy dtype: STRING
    - Python dtype: str
- unique_id
    - unique_id参数对于跟踪节点的执行至关重要。它确保每个节点的实例可以被唯一识别，允许精确的反馈和错误处理。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str
## Optional
- block_info
    - block_info参数作为用户提供的文本输入，可以为块提取过程提供额外的上下文或规格。它用人类洞察力补充了自动分析。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types

# Usage tips
- Infra type: CPU

# Source code
```
class LoraBlockInfo:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'clip': ('CLIP',), 'lora_name': (folder_paths.get_filename_list('loras'),), 'block_info': ('STRING', {'multiline': True})}, 'hidden': {'unique_id': 'UNIQUE_ID'}}
    CATEGORY = 'InspirePack/LoraBlockWeight'
    OUTPUT_NODE = True
    RETURN_TYPES = ()
    FUNCTION = 'doit'

    @staticmethod
    def extract_info(model, clip, lora):
        key_map = comfy.lora.model_lora_keys_unet(model.model)
        key_map = comfy.lora.model_lora_keys_clip(clip.cond_stage_model, key_map)
        loaded = comfy.lora.load_lora(lora, key_map)

        def parse_unet_num(s):
            if s[1] == '.':
                return int(s[0])
            else:
                return int(s)
        input_block_count = set()
        input_blocks = []
        input_blocks_map = {}
        middle_block_count = set()
        middle_blocks = []
        middle_blocks_map = {}
        output_block_count = set()
        output_blocks = []
        output_blocks_map = {}
        text_block_count = set()
        text_blocks = []
        text_blocks_map = {}
        others = []
        for (k, v) in loaded.items():
            k_unet = k[len('diffusion_model.'):]
            if k_unet.startswith('input_blocks.'):
                k_unet_num = k_unet[len('input_blocks.'):len('input_blocks.') + 2]
                k_unet_int = parse_unet_num(k_unet_num)
                input_block_count.add(k_unet_int)
                input_blocks.append(k_unet)
                if k_unet_int in input_blocks_map:
                    input_blocks_map[k_unet_int].append(k_unet)
                else:
                    input_blocks_map[k_unet_int] = [k_unet]
            elif k_unet.startswith('middle_block.'):
                k_unet_num = k_unet[len('middle_block.'):len('middle_block.') + 2]
                k_unet_int = parse_unet_num(k_unet_num)
                middle_block_count.add(k_unet_int)
                middle_blocks.append(k_unet)
                if k_unet_int in middle_blocks_map:
                    middle_blocks_map[k_unet_int].append(k_unet)
                else:
                    middle_blocks_map[k_unet_int] = [k_unet]
            elif k_unet.startswith('output_blocks.'):
                k_unet_num = k_unet[len('output_blocks.'):len('output_blocks.') + 2]
                k_unet_int = parse_unet_num(k_unet_num)
                output_block_count.add(k_unet_int)
                output_blocks.append(k_unet)
                if k_unet_int in output_blocks_map:
                    output_blocks_map[k_unet_int].append(k_unet)
                else:
                    output_blocks_map[k_unet_int] = [k_unet]
            elif k_unet.startswith('_model.encoder.layers.'):
                k_unet_num = k_unet[len('_model.encoder.layers.'):len('_model.encoder.layers.') + 2]
                k_unet_int = parse_unet_num(k_unet_num)
                text_block_count.add(k_unet_int)
                text_blocks.append(k_unet)
                if k_unet_int in text_blocks_map:
                    text_blocks_map[k_unet_int].append(k_unet)
                else:
                    text_blocks_map[k_unet_int] = [k_unet]
            else:
                others.append(k_unet)
        text = ''
        input_blocks = sorted(input_blocks)
        middle_blocks = sorted(middle_blocks)
        output_blocks = sorted(output_blocks)
        others = sorted(others)
        text += f'\n-------[Input blocks] ({len(input_block_count)}, Subs={len(input_blocks)})-------\n'
        input_keys = sorted(input_blocks_map.keys())
        for x in input_keys:
            text += f' IN{x}: {len(input_blocks_map[x])}\n'
        text += f'\n-------[Middle blocks] ({len(middle_block_count)}, Subs={len(middle_blocks)})-------\n'
        middle_keys = sorted(middle_blocks_map.keys())
        for x in middle_keys:
            text += f' MID{x}: {len(middle_blocks_map[x])}\n'
        text += f'\n-------[Output blocks] ({len(output_block_count)}, Subs={len(output_blocks)})-------\n'
        output_keys = sorted(output_blocks_map.keys())
        for x in output_keys:
            text += f' OUT{x}: {len(output_blocks_map[x])}\n'
        text += f'\n-------[Text blocks] ({len(text_block_count)}, Subs={len(text_blocks)})-------\n'
        text_keys = sorted(text_blocks_map.keys())
        for x in text_keys:
            text += f' CLIP{x}: {len(text_blocks_map[x])}\n'
        text += f'\n-------[Base blocks] ({len(others)})-------\n'
        for x in others:
            text += f' {x}\n'
        return text

    def doit(self, model, clip, lora_name, block_info, unique_id):
        lora_path = folder_paths.get_full_path('loras', lora_name)
        lora = comfy.utils.load_torch_file(lora_path, safe_load=True)
        text = LoraBlockInfo.extract_info(model, clip, lora)
        PromptServer.instance.send_sync('inspire-node-feedback', {'node_id': unique_id, 'widget_name': 'block_info', 'type': 'text', 'data': text})
        return {}
```