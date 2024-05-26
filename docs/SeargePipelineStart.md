# Documentation
- Class name: SeargePipelineStart
- Category: UI.CATEGORY_MAGIC
- Output node: True
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

SeargePipelineStart 节点是数据处理流水线的起点。它负责使用给定的工作流版本和可选的数据流初始化流水线。该节点确保在开始处理之前，流水线已正确设置并配置了正确的设置和配置。

# Input types
## Required
- wf_version
    - wf_version 参数指定流水线要使用的流程版本。这对于确定流水线将执行的正确设置和操作至关重要。
    - Comfy dtype: str
    - Python dtype: str
- data
    - data 参数表示可以输入到流水线中的可选数据流。它可能包含处理所需的初始数据，对于流水线产生有意义的结果至关重要。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Union[Dict, None]
- additional_data
    - additional_data 参数提供了一种向流水线提供额外数据的方式。这可以用来用额外的信息丰富主数据流。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Union[Dict, None]
- prompt
    - prompt 参数用于提供可能指导流水线内处理的文本提示。它可能是隐藏的，通常用于内部指导而不是直接处理。
    - Comfy dtype: str
    - Python dtype: Union[str, None]
- extra_pnginfo
    - extra_pnginfo 参数用于流水线可能处理的PNG图像的附加信息。它是可选的，并且可以包含元数据或其他相关细节。
    - Comfy dtype: str
    - Python dtype: Union[str, None]

# Output types
- data
    - SeargePipelineStart 节点输出的数据代表流水线启动后初始化的数据流。它包括节点应用的任何修改或设置，是流水线内进一步处理的基础。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Dict

# Usage tips
- Infra type: CPU

# Source code
```
class SeargePipelineStart:

    def __init__(self):
        self.pipeline = Pipeline()

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'wf_version': (Defs.WORKFLOW_VERSIONS,)}, 'optional': {'data': ('SRG_DATA_STREAM',), 'additional_data': ('SRG_DATA_STREAM',)}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ('SRG_DATA_STREAM',)
    RETURN_NAMES = ('data',)
    FUNCTION = 'trigger'
    OUTPUT_NODE = True
    CATEGORY = UI.CATEGORY_MAGIC

    def trigger(self, wf_version, data=None, additional_data=None, prompt=None, extra_pnginfo=None):
        if data is None:
            print('Warning: Pipeline Start - missing data stream')
        else:
            if additional_data is not None:
                data = data | additional_data
            self.pipeline.start(data)
            access = PipelineAccess(data)
            self.pipeline.enable(access.get_active_setting(UI.S_OPERATING_MODE, UI.F_WORKFLOW_MODE) != UI.NONE)
            mb_hidden = {Names.F_MAGIC_BOX_PROMPT: prompt, Names.F_MAGIC_BOX_EXTRA_PNGINFO: extra_pnginfo}
            mb_version = {Names.F_MAGIC_BOX_EXTENSION: Defs.VERSION, Names.F_MAGIC_BOX_WORKFLOW: wf_version}
            access.update_in_pipeline(Names.S_MAGIC_BOX_HIDDEN, mb_hidden)
            access.update_in_pipeline(Names.S_MAGIC_BOX_VERSION, mb_version)
            if data is not None:
                data[Names.S_MAGIC_BOX_HIDDEN] = mb_hidden
                data[Names.S_MAGIC_BOX_VERSION] = mb_version
        return (data,)
```