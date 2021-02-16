<div class="o-grid mod-form-field" {!! $field['conditional_hidden'] !!}>
    <div class="o-grid-12@md">
        <div class="form-group">
            <label for="{{ $module_id }}-{{ sanitize_title($field['label']) }}">{{ $field['label'] }}{!!  $field['required'] ? '<span class="text-danger">*</span>' : '' !!}</label>
            {!! !empty($field['description']) ? '<div class="text-sm text-dark-gray">' . ModularityFormBuilder\Helper\SanitizeData::convertLinks($field['description']) . '</div>' : '' !!}


                    @fileinput([
                        'name' => sanitize_title($field['label']),
                        'display' => 'area',
                        'multiple' => ($field['type'] === 'multiple') ? true : false,
                        'label' => translate('Select file', 'modularity-form-builder'),
                        'accept' => $field['filetypes'] && is_array($field['filetypes']) ? 'accept="' .$field['attributeList']['accept'] . '"' : '',
                        'filesMax' => $field['files_max']
                    ])
                    @endfileinput

                    @if(isset($field['files_max']))
                        @typography(['element' => 'p', 'variant' => 'meta'])
                            {{__('Max number of files', 'modularity-form-builder')}}: {{$field['files_max']}}
                        @endtypography        
                    @endif

                    <!-- <span class="input-file-selected"><?php _e('No file selected', 'modularity-form-builder'); ?></span> -->

        </div>
    </div>
</div>
