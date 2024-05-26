# Documentation
- Class name: BatchCreativeInterpolationNode
- Category: Steerable-Motion
- Output node: False
- Repo Ref: https://github.com/banodoco/steerable-motion

BatchCreativeInterpolationNode旨在对一批图像执行创意插值。它利用各种参数来控制插值过程中帧的分布、关键帧影响和强度值。该节点特别适用于在不同图像状态之间生成平滑过渡，并且它提供了对最终输出的高控制度，使其适用于广泛的创意应用。

# Input types
## Required
- positive
    - 正面条件图像是一个关键输入，它影响插值的方向和风格。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- negative
    - 负面条件图像用于限制或引导插值，使其与正面图像的方向相反。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- images
    - 将被插值的输入图像。此参数至关重要，因为它定义了将要被转换的内容。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- model
    - 用于插值过程的模型。对于生成连贯的转换至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- ipadapter
    - IPA适配器用于在插值期间对图像应用特定的转换或风格。
    - Comfy dtype: IPADAPTER
    - Python dtype: dict
- clip_vision
    - CLIP Vision模型被用来以支持插值的方式分析和处理图像。
    - Comfy dtype: CLIP_VISION
    - Python dtype: torch.nn.Module
- type_of_frame_distribution
    - 确定插值的帧分布方法，可以是线性的或使用动态值。
    - Comfy dtype: COMBO[linear, dynamic]
    - Python dtype: str
- type_of_key_frame_influence
    - 指定关键帧的影响是线性的还是遵循动态模式。
    - Comfy dtype: COMBO[linear, dynamic]
    - Python dtype: str
- type_of_strength_distribution
    - 指示插值的强度分布类型，可以是线性或动态。
    - Comfy dtype: COMBO[linear, dynamic]
    - Python dtype: str
## Optional
- linear_frame_distribution_value
    - 用于线性帧分布的值。仅当帧分布类型设置为'linear'时才相关。
    - Comfy dtype: INT
    - Python dtype: int
- dynamic_frame_distribution_values
    - 定义动态帧分布的逗号分隔值字符串。如果帧分布类型为'dynamic'，则需要此参数。
    - Comfy dtype: STRING
    - Python dtype: str
- linear_key_frame_influence_value
    - 确定关键帧线性影响的值。如果关键帧影响类型为'linear'，则适用。
    - Comfy dtype: STRING
    - Python dtype: str
- dynamic_key_frame_influence_values
    - 表示关键帧的动态影响值的字符串，当关键帧影响类型为'dynamic'时使用。
    - Comfy dtype: STRING
    - Python dtype: str
- linear_strength_value
    - 如果选择了线性强度分布，用于插值的线性强度值。
    - Comfy dtype: STRING
    - Python dtype: str
- dynamic_strength_values
    - 定义帧的动态强度分布的逗号分隔值字符串。
    - Comfy dtype: STRING
    - Python dtype: str
- buffer
    - 缓冲值向关键帧位置添加填充，影响插值的范围。
    - Comfy dtype: INT
    - Python dtype: int
- high_detail_mode
    - 启用时，高细节模式会调整IPA设置，以获得更详细和精细的插值。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- base_ipa_advanced_settings
    - 基本IPA应用的高级设置，允许微调插值过程。
    - Comfy dtype: ADVANCED_IPA_SETTINGS
    - Python dtype: dict
- detail_ipa_advanced_settings
    - 详细IPA应用的高级设置，在使用高细节模式时使用。
    - Comfy dtype: ADVANCED_IPA_SETTINGS
    - Python dtype: dict

# Output types
- GRAPH
    - GRAPH输出可视化插值过程中应用的权重比较，提供对不同帧如何受到影响的洞察。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- POSITIVE
    - POSITIVE输出反映了插值中使用的正面条件，捕捉了过程的指导方向。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- NEGATIVE
    - NEGATIVE输出代表负面条件，它以期望的方式限制插值。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- MODEL
    - MODEL输出是插值后修改的模型，包含了应用于输入图像的创意转换。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- KEYFRAME_POSITIONS
    - KEYFRAME_POSITIONS输出提供了用于插值的稀疏索引方法，详细说明了关键帧的位置。
    - Comfy dtype: SPARSE_METHOD
    - Python dtype: SparseIndexMethodImport
- BATCH_SIZE
    - BATCH_SIZE输出指示了插值期间处理的批次大小，反映了转换的图像数量。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: GPU

# Source code
```
class BatchCreativeInterpolationNode:

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float('NaN')

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'images': ('IMAGE',), 'model': ('MODEL',), 'ipadapter': ('IPADAPTER',), 'clip_vision': ('CLIP_VISION',), 'type_of_frame_distribution': (['linear', 'dynamic'],), 'linear_frame_distribution_value': ('INT', {'default': 16, 'min': 4, 'max': 64, 'step': 1}), 'dynamic_frame_distribution_values': ('STRING', {'multiline': True, 'default': '0,10,26,40'}), 'type_of_key_frame_influence': (['linear', 'dynamic'],), 'linear_key_frame_influence_value': ('STRING', {'multiline': False, 'default': '(1.0,1.0)'}), 'dynamic_key_frame_influence_values': ('STRING', {'multiline': True, 'default': '(1.0,1.0),(1.0,1.5)(1.0,0.5)'}), 'type_of_strength_distribution': (['linear', 'dynamic'],), 'linear_strength_value': ('STRING', {'multiline': False, 'default': '(0.3,0.4)'}), 'dynamic_strength_values': ('STRING', {'multiline': True, 'default': '(0.0,1.0),(0.0,1.0),(0.0,1.0),(0.0,1.0)'}), 'buffer': ('INT', {'default': 4, 'min': 1, 'max': 16, 'step': 1}), 'high_detail_mode': ('BOOLEAN', {'default': True})}, 'optional': {'base_ipa_advanced_settings': ('ADVANCED_IPA_SETTINGS',), 'detail_ipa_advanced_settings': ('ADVANCED_IPA_SETTINGS',)}}
    RETURN_TYPES = ('IMAGE', 'CONDITIONING', 'CONDITIONING', 'MODEL', 'SPARSE_METHOD', 'INT')
    RETURN_NAMES = ('GRAPH', 'POSITIVE', 'NEGATIVE', 'MODEL', 'KEYFRAME_POSITIONS', 'BATCH_SIZE')
    FUNCTION = 'combined_function'
    CATEGORY = 'Steerable-Motion'

    def combined_function(self, positive, negative, images, model, ipadapter, clip_vision, type_of_frame_distribution, linear_frame_distribution_value, dynamic_frame_distribution_values, type_of_key_frame_influence, linear_key_frame_influence_value, dynamic_key_frame_influence_values, type_of_strength_distribution, linear_strength_value, dynamic_strength_values, buffer, high_detail_mode, base_ipa_advanced_settings=None, detail_ipa_advanced_settings=None):

        def get_keyframe_positions(type_of_frame_distribution, dynamic_frame_distribution_values, images, linear_frame_distribution_value):
            if type_of_frame_distribution == 'dynamic':
                if isinstance(dynamic_frame_distribution_values, str):
                    return sorted([int(kf.strip()) for kf in dynamic_frame_distribution_values.split(',')])
                elif isinstance(dynamic_frame_distribution_values, list):
                    return sorted(dynamic_frame_distribution_values)
            else:
                return [i * linear_frame_distribution_value for i in range(len(images))]

        def create_mask_batch(last_key_frame_position, weights, frames):
            (width, height) = (512, 512)
            frame_to_weight = {frame: weights[i] for (i, frame) in enumerate(frames)}
            masks = []
            for frame_number in range(last_key_frame_position):
                strength = frame_to_weight.get(frame_number, 0.0)
                mask = torch.full((height, width), strength)
                masks.append(mask)
            masks_tensor = torch.stack(masks, dim=0)
            return masks_tensor

        def plot_weight_comparison(cn_frame_numbers, cn_weights, ipadapter_frame_numbers, ipadapter_weights, buffer):
            plt.figure(figsize=(12, 8))
            colors = ['b', 'g', 'r', 'c', 'm', 'y', 'k']
            cn_frame_numbers = cn_frame_numbers if cn_frame_numbers is not None else []
            cn_weights = cn_weights if cn_weights is not None else []
            ipadapter_frame_numbers = ipadapter_frame_numbers if ipadapter_frame_numbers is not None else []
            ipadapter_weights = ipadapter_weights if ipadapter_weights is not None else []
            max_length = max(len(cn_frame_numbers), len(ipadapter_frame_numbers))
            label_counter = 1 if buffer < 0 else 0
            for i in range(max_length):
                if i < len(cn_frame_numbers):
                    label = 'cn_strength_buffer' if i == 0 and buffer > 0 else f'cn_strength_{label_counter}'
                    plt.plot(cn_frame_numbers[i], cn_weights[i], marker='o', color=colors[i % len(colors)], label=label)
                if i < len(ipadapter_frame_numbers):
                    label = 'ipa_strength_buffer' if i == 0 and buffer > 0 else f'ipa_strength_{label_counter}'
                    plt.plot(ipadapter_frame_numbers[i], ipadapter_weights[i], marker='x', linestyle='--', color=colors[i % len(colors)], label=label)
                if label_counter == 0 or buffer < 0 or i > 0:
                    label_counter += 1
            plt.legend()
            all_weights = cn_weights + ipadapter_weights
            max_weight = max((max(sublist) for sublist in all_weights if sublist)) * 1.5
            plt.ylim(0, max_weight)
            buffer_io = BytesIO()
            plt.savefig(buffer_io, format='png', bbox_inches='tight')
            plt.close()
            buffer_io.seek(0)
            img = Image.open(buffer_io)
            img_tensor = transforms.ToTensor()(img)
            img_tensor = img_tensor.unsqueeze(0)
            img_tensor = img_tensor.permute([0, 2, 3, 1])
            return (img_tensor,)

        def extract_strength_values(type_of_key_frame_influence, dynamic_key_frame_influence_values, keyframe_positions, linear_key_frame_influence_value):
            if type_of_key_frame_influence == 'dynamic':
                if isinstance(dynamic_key_frame_influence_values, str):
                    dynamic_values = eval(dynamic_key_frame_influence_values)
                else:
                    dynamic_values = dynamic_key_frame_influence_values
                dynamic_values_corrected = []
                for value in dynamic_values:
                    if len(value) == 2:
                        value = (value[0], value[1], value[0])
                    dynamic_values_corrected.append(value)
                return dynamic_values_corrected
            else:
                if len(linear_key_frame_influence_value) == 2:
                    linear_key_frame_influence_value = (linear_key_frame_influence_value[0], linear_key_frame_influence_value[1], linear_key_frame_influence_value[0])
                return [linear_key_frame_influence_value for _ in range(len(keyframe_positions) - 1)]

        def extract_influence_values(type_of_key_frame_influence, dynamic_key_frame_influence_values, keyframe_positions, linear_key_frame_influence_value):
            if isinstance(linear_key_frame_influence_value, str) and linear_key_frame_influence_value[0] == '(':
                linear_key_frame_influence_value = eval(linear_key_frame_influence_value)
            if not isinstance(linear_key_frame_influence_value, tuple):
                if isinstance(linear_key_frame_influence_value, (float, str)):
                    try:
                        value = float(linear_key_frame_influence_value)
                        linear_key_frame_influence_value = (value, value)
                    except ValueError:
                        raise ValueError('linear_key_frame_influence_value must be a float or a string representing a float')
            number_of_outputs = len(keyframe_positions) - 1
            if type_of_key_frame_influence == 'dynamic':
                if all((isinstance(x, float) for x in dynamic_key_frame_influence_values)):
                    dynamic_values = [(value, value) for value in dynamic_key_frame_influence_values]
                elif isinstance(dynamic_key_frame_influence_values[0], str) and dynamic_key_frame_influence_values[0] == '(':
                    string_representation = ''.join(dynamic_key_frame_influence_values)
                    dynamic_values = eval(f'[{string_representation}]')
                else:
                    dynamic_values = dynamic_key_frame_influence_values if isinstance(dynamic_key_frame_influence_values, list) else [dynamic_key_frame_influence_values]
                return dynamic_values[:number_of_outputs]
            else:
                return [linear_key_frame_influence_value for _ in range(number_of_outputs)]

        def calculate_weights(batch_index_from, batch_index_to, strength_from, strength_to, interpolation, revert_direction_at_midpoint, last_key_frame_position, i, number_of_items, buffer):
            range_start = batch_index_from
            range_end = batch_index_to
            if i == number_of_items - 1:
                range_end = last_key_frame_position
            steps = range_end - range_start
            diff = strength_to - strength_from
            index = np.linspace(0, 1, steps // 2 + 1) if revert_direction_at_midpoint else np.linspace(0, 1, steps)
            if interpolation == 'linear':
                weights = np.linspace(strength_from, strength_to, len(index))
            elif interpolation == 'ease-in':
                weights = diff * np.power(index, 2) + strength_from
            elif interpolation == 'ease-out':
                weights = diff * (1 - np.power(1 - index, 2)) + strength_from
            elif interpolation == 'ease-in-out':
                weights = diff * ((1 - np.cos(index * np.pi)) / 2) + strength_from
            if revert_direction_at_midpoint:
                weights = np.concatenate([weights, weights[::-1]])
            frame_numbers = np.arange(range_start, range_start + len(weights))
            if range_start < 0 and i > 0:
                drop_count = abs(range_start)
                weights = weights[drop_count:]
                frame_numbers = frame_numbers[drop_count:]
            if range_end > last_key_frame_position and i < number_of_items - 1:
                drop_count = range_end - last_key_frame_position
                weights = weights[:-drop_count]
                frame_numbers = frame_numbers[:-drop_count]
            return (weights, frame_numbers)

        def process_weights(frame_numbers, weights, multiplier):
            adjusted_weights = [min(max(weight * multiplier, 0.0), 1.0) for weight in weights]
            filtered_frames_and_weights = [(frame, weight) for (frame, weight) in zip(frame_numbers, adjusted_weights) if weight > 0.0]
            (filtered_frame_numbers, filtered_weights) = zip(*filtered_frames_and_weights) if filtered_frames_and_weights else ([], [])
            return (list(filtered_frame_numbers), list(filtered_weights))

        def calculate_influence_frame_number(key_frame_position, next_key_frame_position, distance):
            key_frame_distance = abs(next_key_frame_position - key_frame_position)
            extended_distance = key_frame_distance * distance
            if key_frame_position < next_key_frame_position:
                influence_frame_number = key_frame_position + extended_distance
            else:
                influence_frame_number = key_frame_position - extended_distance
            return round(influence_frame_number)
        keyframe_positions = get_keyframe_positions(type_of_frame_distribution, dynamic_frame_distribution_values, images, linear_frame_distribution_value)
        shifted_keyframes_position = [position + buffer - 2 for position in keyframe_positions]
        shifted_keyframe_positions_string = ','.join((str(pos) for pos in shifted_keyframes_position))
        sparseindexmethod = SparseIndexMethodNodeImport()
        (sparse_indexes,) = sparseindexmethod.get_method(shifted_keyframe_positions_string)
        if buffer > 0:
            keyframe_positions = [position + buffer - 1 for position in keyframe_positions]
            keyframe_positions.insert(0, 0)
            last_position_with_buffer = keyframe_positions[-1] + buffer - 1
            keyframe_positions.append(last_position_with_buffer)
        if base_ipa_advanced_settings is None:
            if high_detail_mode:
                base_ipa_advanced_settings = {'ipa_starts_at': 0.0, 'ipa_ends_at': 0.3, 'ipa_weight_type': 'ease in-out', 'ipa_weight': 1.0, 'ipa_embeds_scaling': 'V only', 'ipa_noise_strength': 0.0, 'use_image_for_noise': False, 'type_of_noise': 'fade', 'noise_blur': 0}
            else:
                base_ipa_advanced_settings = {'ipa_starts_at': 0.0, 'ipa_ends_at': 0.75, 'ipa_weight_type': 'ease in-out', 'ipa_weight': 1.0, 'ipa_embeds_scaling': 'V only', 'ipa_noise_strength': 0.0, 'use_image_for_noise': False, 'type_of_noise': 'fade', 'noise_blur': 0}
        if detail_ipa_advanced_settings is None:
            if high_detail_mode:
                detail_ipa_advanced_settings = {'ipa_starts_at': 0.25, 'ipa_ends_at': 0.75, 'ipa_weight_type': 'ease in-out', 'ipa_weight': 1.0, 'ipa_embeds_scaling': 'V only', 'ipa_noise_strength': 0.0, 'use_image_for_noise': False, 'type_of_noise': 'fade', 'noise_blur': 0}
        strength_values = extract_strength_values(type_of_strength_distribution, dynamic_strength_values, keyframe_positions, linear_strength_value)
        strength_values = [literal_eval(val) if isinstance(val, str) else val for val in strength_values]
        corrected_strength_values = []
        for val in strength_values:
            if len(val) == 2:
                val = (val[0], val[1], val[0])
            corrected_strength_values.append(val)
        strength_values = corrected_strength_values
        key_frame_influence_values = extract_influence_values(type_of_key_frame_influence, dynamic_key_frame_influence_values, keyframe_positions, linear_key_frame_influence_value)
        key_frame_influence_values = [literal_eval(val) if isinstance(val, str) else val for val in key_frame_influence_values]
        last_key_frame_position = keyframe_positions[-1] + 1
        all_cn_frame_numbers = []
        all_cn_weights = []
        all_ipa_weights = []
        all_ipa_frame_numbers = []
        for i in range(len(keyframe_positions)):
            keyframe_position = keyframe_positions[i]
            interpolation = 'ease-in-out'
            if i == 0:
                image = images[0]
                strength_from = strength_to = strength_values[0][1]
                batch_index_from = 0
                batch_index_to_excl = buffer
                (weights, frame_numbers) = calculate_weights(batch_index_from, batch_index_to_excl, strength_from, strength_to, interpolation, False, last_key_frame_position, i, len(keyframe_positions), buffer)
            elif i == 1:
                image = images[i - 1]
                (key_frame_influence_from, key_frame_influence_to) = key_frame_influence_values[i - 1]
                (start_strength, mid_strength, end_strength) = strength_values[i - 1]
                keyframe_position = keyframe_positions[i]
                next_key_frame_position = keyframe_positions[i + 1]
                batch_index_from = keyframe_position
                batch_index_to_excl = calculate_influence_frame_number(keyframe_position, next_key_frame_position, key_frame_influence_to)
                (weights, frame_numbers) = calculate_weights(batch_index_from, batch_index_to_excl, mid_strength, end_strength, interpolation, False, last_key_frame_position, i, len(keyframe_positions), buffer)
            elif i == len(keyframe_positions) - 2:
                image = images[i - 1]
                (key_frame_influence_from, key_frame_influence_to) = key_frame_influence_values[i - 1]
                (start_strength, mid_strength, end_strength) = strength_values[i - 1]
                keyframe_position = keyframe_positions[i]
                previous_key_frame_position = keyframe_positions[i - 1]
                batch_index_from = calculate_influence_frame_number(keyframe_position, previous_key_frame_position, key_frame_influence_from)
                batch_index_to_excl = keyframe_position
                (weights, frame_numbers) = calculate_weights(batch_index_from, batch_index_to_excl, start_strength, mid_strength, interpolation, False, last_key_frame_position, i, len(keyframe_positions), buffer)
            elif i == len(keyframe_positions) - 1:
                image = images[i - 2]
                strength_from = strength_to = strength_values[i - 2][1]
                batch_index_from = keyframe_positions[i - 1]
                batch_index_to_excl = last_key_frame_position
                (weights, frame_numbers) = calculate_weights(batch_index_from, batch_index_to_excl, strength_from, strength_to, interpolation, False, last_key_frame_position, i, len(keyframe_positions), buffer)
            else:
                image = images[i - 1]
                (key_frame_influence_from, key_frame_influence_to) = key_frame_influence_values[i - 1]
                (start_strength, mid_strength, end_strength) = strength_values[i - 1]
                keyframe_position = keyframe_positions[i]
                previous_key_frame_position = keyframe_positions[i - 1]
                batch_index_from = calculate_influence_frame_number(keyframe_position, previous_key_frame_position, key_frame_influence_from)
                batch_index_to_excl = keyframe_position
                (first_half_weights, first_half_frame_numbers) = calculate_weights(batch_index_from, batch_index_to_excl, start_strength, mid_strength, interpolation, False, last_key_frame_position, i, len(keyframe_positions), buffer)
                next_key_frame_position = keyframe_positions[i + 1]
                batch_index_from = keyframe_position
                batch_index_to_excl = calculate_influence_frame_number(keyframe_position, next_key_frame_position, key_frame_influence_to)
                (second_half_weights, second_half_frame_numbers) = calculate_weights(batch_index_from, batch_index_to_excl, mid_strength, end_strength, interpolation, False, last_key_frame_position, i, len(keyframe_positions), buffer)
                weights = np.concatenate([first_half_weights, second_half_weights])
                frame_numbers = np.concatenate([first_half_frame_numbers, second_half_frame_numbers])
            (ipa_frame_numbers, ipa_weights) = process_weights(frame_numbers, weights, 1.0)
            prepare_for_clip_vision = PrepImageForClipVisionImport()
            (prepped_image,) = prepare_for_clip_vision.prep_image(image=image.unsqueeze(0), interpolation='LANCZOS', crop_position='pad', sharpening=0.1)
            mask = create_mask_batch(last_key_frame_position, ipa_weights, ipa_frame_numbers)
            if base_ipa_advanced_settings['ipa_noise_strength'] > 0:
                if base_ipa_advanced_settings['use_image_for_noise']:
                    noise_image = prepped_image
                else:
                    noise_image = None
                ipa_noise = IPAdapterNoiseImport()
                (negative_noise,) = ipa_noise.make_noise(type=base_ipa_advanced_settings['type_of_noise'], strength=base_ipa_advanced_settings['ipa_noise_strength'], blur=base_ipa_advanced_settings['noise_blur'], image_optional=noise_image)
            else:
                negative_noise = None
            ipadapter_application = IPAdapterAdvancedImport()
            (model,) = ipadapter_application.apply_ipadapter(model=model, ipadapter=ipadapter, image=prepped_image, weight=base_ipa_advanced_settings['ipa_weight'], weight_type=base_ipa_advanced_settings['ipa_weight_type'], start_at=base_ipa_advanced_settings['ipa_starts_at'], end_at=base_ipa_advanced_settings['ipa_ends_at'], clip_vision=clip_vision, attn_mask=mask, image_negative=negative_noise, embeds_scaling=base_ipa_advanced_settings['ipa_embeds_scaling'])
            if high_detail_mode:
                if detail_ipa_advanced_settings['ipa_noise_strength'] > 0:
                    if detail_ipa_advanced_settings['use_image_for_noise']:
                        noise_image = image.unsqueeze(0)
                    else:
                        noise_image = None
                    ipa_noise = IPAdapterNoiseImport()
                    (negative_noise,) = ipa_noise.make_noise(type=detail_ipa_advanced_settings['type_of_noise'], strength=detail_ipa_advanced_settings['ipa_noise_strength'], blur=detail_ipa_advanced_settings['noise_blur'], image_optional=noise_image)
                else:
                    negative_noise = None
                tiled_ipa_application = IPAdapterTiledImport()
                (model, *_) = tiled_ipa_application.apply_tiled(model=model, ipadapter=ipadapter, image=image.unsqueeze(0), weight=detail_ipa_advanced_settings['ipa_weight'], weight_type=detail_ipa_advanced_settings['ipa_weight_type'], start_at=detail_ipa_advanced_settings['ipa_starts_at'], end_at=detail_ipa_advanced_settings['ipa_ends_at'], clip_vision=clip_vision, attn_mask=mask, sharpening=0.1, image_negative=negative_noise, embeds_scaling=detail_ipa_advanced_settings['ipa_embeds_scaling'])
            all_ipa_frame_numbers.append(ipa_frame_numbers)
            all_ipa_weights.append(ipa_weights)
        (comparison_diagram,) = plot_weight_comparison(all_cn_frame_numbers, all_cn_weights, all_ipa_frame_numbers, all_ipa_weights, buffer)
        return (comparison_diagram, positive, negative, model, sparse_indexes, last_key_frame_position)
```