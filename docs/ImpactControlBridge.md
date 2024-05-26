# Documentation
- Class name: ImpactControlBridge
- Category: ImpactPack/Logic/_for_test
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ImpactControlBridge节点的'doit'方法旨在管理工作流中节点的操作状态。它确保节点根据提供的条件和行为处于激活、静音或旁路状态，从而控制系统内数据和执行的流程。

# Input types
## Required
- value
    - 'value'参数对于节点的决策过程至关重要，因为它决定了影响工作流中后续操作的初始状态。
    - Comfy dtype: any_typ
    - Python dtype: Any
- mode
    - 'mode'参数指示节点是否应该在工作流中强制执行某种操作状态，影响执行路径。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- behavior
    - 'behavior'参数允许在节点内应用条件逻辑，根据满足的具体条件修改其响应。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- unique_id
    - 'unique_id'参数用于识别工作流中的特定节点，实现目标控制和操作。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str
- prompt
    - 'prompt'参数提供上下文信息，这对于节点在工作流中做出明智的决策可能是必要的。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - 'extra_pnginfo'参数包含节点有效执行其操作可能需要的额外数据。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Dict[str, Any]

# Output types
- value
    - 'value'输出反映了节点处理后的最终状态，包含了节点操作的结果。
    - Comfy dtype: any_typ
    - Python dtype: Any

# Usage tips
- Infra type: CPU

# Source code
```
class ImpactControlBridge:

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'value': (any_typ,), 'mode': ('BOOLEAN', {'default': True, 'label_on': 'Active', 'label_off': 'Mute/Bypass'}), 'behavior': ('BOOLEAN', {'default': True, 'label_on': 'Mute', 'label_off': 'Bypass'})}, 'hidden': {'unique_id': 'UNIQUE_ID', 'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    FUNCTION = 'doit'
    CATEGORY = 'ImpactPack/Logic/_for_test'
    RETURN_TYPES = (any_typ,)
    RETURN_NAMES = ('value',)
    OUTPUT_NODE = True

    @classmethod
    def IS_CHANGED(self, value, mode, behavior=True, unique_id=None, prompt=None, extra_pnginfo=None):
        (nodes, links) = workflow_to_map(extra_pnginfo['workflow'])
        next_nodes = []
        for link in nodes[unique_id]['outputs'][0]['links']:
            node_id = str(links[link][2])
            impact.utils.collect_non_reroute_nodes(nodes, links, next_nodes, node_id)
        return next_nodes

    def doit(self, value, mode, behavior=True, unique_id=None, prompt=None, extra_pnginfo=None):
        global error_skip_flag
        (nodes, links) = workflow_to_map(extra_pnginfo['workflow'])
        active_nodes = []
        mute_nodes = []
        bypass_nodes = []
        for link in nodes[unique_id]['outputs'][0]['links']:
            node_id = str(links[link][2])
            next_nodes = []
            impact.utils.collect_non_reroute_nodes(nodes, links, next_nodes, node_id)
            for next_node_id in next_nodes:
                node_mode = nodes[next_node_id]['mode']
                if node_mode == 0:
                    active_nodes.append(next_node_id)
                elif node_mode == 2:
                    mute_nodes.append(next_node_id)
                elif node_mode == 4:
                    bypass_nodes.append(next_node_id)
        if mode:
            should_be_active_nodes = mute_nodes + bypass_nodes
            if len(should_be_active_nodes) > 0:
                PromptServer.instance.send_sync('impact-bridge-continue', {'node_id': unique_id, 'actives': list(should_be_active_nodes)})
                error_skip_flag = True
                raise Exception('IMPACT-PACK-SIGNAL: STOP CONTROL BRIDGE\nIf you see this message, your ComfyUI-Manager is outdated. Please update it.')
        elif behavior:
            should_be_mute_nodes = active_nodes + bypass_nodes
            if len(should_be_mute_nodes) > 0:
                PromptServer.instance.send_sync('impact-bridge-continue', {'node_id': unique_id, 'mutes': list(should_be_mute_nodes)})
                error_skip_flag = True
                raise Exception('IMPACT-PACK-SIGNAL: STOP CONTROL BRIDGE\nIf you see this message, your ComfyUI-Manager is outdated. Please update it.')
        else:
            should_be_bypass_nodes = active_nodes + mute_nodes
            if len(should_be_bypass_nodes) > 0:
                PromptServer.instance.send_sync('impact-bridge-continue', {'node_id': unique_id, 'bypasses': list(should_be_bypass_nodes)})
                error_skip_flag = True
                raise Exception('IMPACT-PACK-SIGNAL: STOP CONTROL BRIDGE\nIf you see this message, your ComfyUI-Manager is outdated. Please update it.')
        return (value,)
```