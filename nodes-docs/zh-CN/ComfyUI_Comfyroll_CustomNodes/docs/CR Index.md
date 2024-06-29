# Documentation
- Class name: CR_Index
- Category: Comfyroll/Utils/Index
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_Index节点旨在从给定数据集中管理和检索特定索引。它提供高效索引大型数据集的功能，满足各种数据操作和分析任务的需求。该节点强调简单性和灵活性，确保用户可以轻松地将其集成到他们的工作流程中，实现流程化操作。

# Input types
## Required
- index
    - ‘index’参数对于指定节点将从中检索信息的数据集内的位置至关重要。它通过确定将访问的确切数据点直接影响节点的输出。此参数对于工作流内的数据选择和过滤过程至关重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- print_to_console
    - ‘print_to_console’参数允许用户切换控制台输出。当设置为‘Yes’时，它使节点能够将当前索引值打印到控制台，在执行期间提供实时反馈。这个特性对于调试和监控数据索引操作的进度特别有用。
    - Comfy dtype: COMBO['Yes', 'No']
    - Python dtype: str

# Output types
- INT
    - 'INT'输出提供了从数据集中检索到的索引值，可以进一步用于下游流程。这个输出很重要，因为它为后续的数据操作和分析奠定了基础，确保了工作流的完整性和连续性。
    - Comfy dtype: INT
    - Python dtype: int
- show_help
    - 'show_help'输出提供了指向节点文档的URL链接，使用户能够访问有关如何有效使用该节点的额外信息和指导。这对于新用户或当需要进一步澄清节点功能时特别有益。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_Index:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'index': ('INT', {'default': 1, 'min': 0, 'max': 10000}), 'print_to_console': (['Yes', 'No'],)}}
    RETURN_TYPES = ('INT', 'STRING')
    RETURN_NAMES = ('INT', 'show_help')
    FUNCTION = 'index'
    CATEGORY = icons.get('Comfyroll/Utils/Index')

    def index(self, index, print_to_console):
        if print_to_console == 'Yes':
            print(f'[Info] CR Index:{index}')
        show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Index-Nodes#cr-index'
        return (index, show_help)
```