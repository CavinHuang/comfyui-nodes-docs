# Documentation
- Class name: showLoaderSettingsNames
- Category: EasyUse/Util
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

“showLoaderSettingsNames”节点旨在提取并展示流水线设置中涉及的各种组件的名称，特别关注检查点、VAE和LoRA名称。它作为一个实用工具，用于通知用户当前工作流的配置细节，增强透明度和易用性。

# Input types
## Required
- pipe
    - “pipe”参数至关重要，因为它代表了包含要提取设置的流水线。这是一个必需的输入，通过提供加载器设置的上下文，在节点的操作中起着关键作用。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- names
    - “names”参数虽然是可选的，但可以用来提供加载器设置的额外上下文或默认值。它不直接影响节点的执行，但可能会影响结果的呈现或解释方式。
    - Comfy dtype: INFO
    - Python dtype: Union[str, None]
- unique_id
    - “unique_id”参数用于标识工作流中的特定节点。它是可选的，提供后可以帮助节点更准确地定位和更新特定节点的设置。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: Union[str, None]
- extra_pnginfo
    - “extra_pnginfo”参数是一个可选输入，可以包含有关工作流的额外信息。当需要详细的工作流信息以使节点有效地执行其功能时，它特别有用。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Union[Dict[str, Any], None]

# Output types
- ckpt_name
    - “ckpt_name”输出提供了流水线中使用的检查点的名称，这是用户了解模型配置的关键信息。
    - Comfy dtype: STRING
    - Python dtype: str
- vae_name
    - “vae_name”输出表示流水线中VAE组件的名称，为用户提供了正在使用的生成模型的洞察。
    - Comfy dtype: STRING
    - Python dtype: str
- lora_name
    - “lora_name”输出显示了LoRA模型的名称，这对于用户了解应用于基础模型的微调功能非常重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class showLoaderSettingsNames:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pipe': ('PIPE_LINE',), 'names': ('INFO', {'default': '', 'forceInput': False})}, 'hidden': {'unique_id': 'UNIQUE_ID', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ('STRING', 'STRING', 'STRING')
    RETURN_NAMES = ('ckpt_name', 'vae_name', 'lora_name')
    FUNCTION = 'notify'
    OUTPUT_NODE = True
    CATEGORY = 'EasyUse/Util'

    def notify(self, pipe, names=None, unique_id=None, extra_pnginfo=None):
        if unique_id and extra_pnginfo and ('workflow' in extra_pnginfo):
            workflow = extra_pnginfo['workflow']
            node = next((x for x in workflow['nodes'] if str(x['id']) == unique_id), None)
            if node:
                ckpt_name = pipe['loader_settings']['ckpt_name'] if 'ckpt_name' in pipe['loader_settings'] else ''
                vae_name = pipe['loader_settings']['vae_name'] if 'vae_name' in pipe['loader_settings'] else ''
                lora_name = pipe['loader_settings']['lora_name'] if 'lora_name' in pipe['loader_settings'] else ''
                if ckpt_name:
                    ckpt_name = os.path.basename(os.path.splitext(ckpt_name)[0])
                if vae_name:
                    vae_name = os.path.basename(os.path.splitext(vae_name)[0])
                if lora_name:
                    lora_name = os.path.basename(os.path.splitext(lora_name)[0])
                names = 'ckpt_name: ' + ckpt_name + '\n' + 'vae_name: ' + vae_name + '\n' + 'lora_name: ' + lora_name
                node['widgets_values'] = names
        return {'ui': {'text': names}, 'result': (ckpt_name, vae_name, lora_name)}
```