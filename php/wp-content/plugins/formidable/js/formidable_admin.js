jQuery(document).ready(function($){
if(typeof(__FRMURL)!='undefined')
	var ajax_url=__FRMURL;
if(typeof(__FRMDEFDESC)!='undefined')
	var def_desc=__FRMDEFDESC;
var form_id=$('input[name="id"]').val();
		
$(".frm_elastic_text").elastic();

window.onscroll = document.documentElement.onscroll = frmSetMenuOffset;
frmSetMenuOffset();
            
$("input[name='options[success_action]']").change(function(){
$('.success_action_box').hide();
if($(this).val()=='redirect'){$('.success_action_redirect_box.success_action_box').fadeIn('slow');}
else if($(this).val()=='page'){$('.success_action_page_box.success_action_box').fadeIn('slow');}
else{$('.frm_show_form_opt').show();$('.success_action_message_box.success_action_box').fadeIn('slow');}
});

if($('#frm_adv_info').length>0){ 
	$('#frm_adv_info').before('<div id="frm_position_ele"></div>');

	$('.frm_code_list a').addClass('frm_noallow');
	$('#frm_adv_info a').live('mousedown', function(e){e.preventDefault();});

	$('form input, form textarea, .wpbody-content').live('focusin focusout', function(e){ 
		if(e.type=='focusin') var id=$(this).attr('id'); else var id=''; frmToggleAllowedShortcodes(id);
	});

	if(typeof(tinymce)=='object'){  
	DOM=tinymce.DOM; 
	if(typeof(DOM.events) != 'undefined'){
	DOM.events.add( DOM.select('.wp-editor-wrap'), 'mouseover', function(e){
	if($('*:focus').length>0)return;
	if(this.id)frmToggleAllowedShortcodes(this.id.slice(3, -5));});
	DOM.events.add( DOM.select('.wp-editor-wrap'), 'mouseout', function(e){
	if($('*:focus').length>0)return;
	if(this.id)frmToggleAllowedShortcodes(this.id.slice(3, -5));});
	}else{
	$('.wp-editor-wrap').bind('mouseover', 'mouseout', function(e){
	    if($('*:focus').length>0)return; 
	    if(this.id)frmToggleAllowedShortcodes(this.id.slice(3, -5));
	});    
	}
	}
}

if($('.hide_editable').length>0){
$('.hide_editable').hide();
if( $('#editable').attr("checked")) $('.hide_editable').show();
$('#editable').change(function(){if( $(this).attr('checked')) $('.hide_editable').show(); else $('.hide_editable').hide();});
$('.hide_ar').hide();
if( $('#auto_responder').attr('checked')) $('.hide_ar').show();
}

if($('.widget-top').length>0){
$('.widget-top').live('click', function(){if($(this).hasClass('widget-action')) return;
if($(this).parents().hasClass('frm_35_trigger')) return;
inside=$(this).closest('div.widget').children('.widget-inside');
if(inside.is(':hidden')){inside.slideDown('fast');}else{inside.slideUp('fast');}
});
$('.widget-top,a.widget-action').click(function(){ $(this).closest('div.widget').siblings().children('.widget-inside').slideUp('fast');});
}

if($('.frm_ipe_form_name').length>0){
$('.frm_ipe_form_name').editInPlace({
url:ajax_url,params:"action=frm_form_name_in_place_edit&form_id="+form_id,value_required:"true",bg_out:'#fff'
});

$(".frm_ipe_form_desc").editInPlace({
url:ajax_url,params:"action=frm_form_desc_in_place_edit&form_id="+form_id,
field_type:"textarea",textarea_rows:3,textarea_cols:60,default_text:def_desc
});
     
$(".frm_ipe_field_desc").editInPlace({
url:ajax_url,params:"action=frm_field_desc_in_place_edit",default_text:def_desc,field_type:'textarea',textarea_rows:3
});

$(".frm_ipe_field_option, .frm_ipe_field_option_select, .frm_ipe_field_option_key").editInPlace({url:ajax_url,params:"action=frm_field_option_ipe",default_text:'(Blank)'});
$(".frm_ipe_field_label").editInPlace({url:ajax_url,params:"action=frm_field_name_in_place_edit",value_required:"true"});

$('select[name^="item_meta"], textarea[name^="item_meta"]').css('float','left');
$('input[name^="item_meta"]').not(':radio, :checkbox').css('float','left');
}

// tabs
$('.frm-category-tabs a').click(function(){
	var t = $(this).attr('href');
	if(typeof(t)=='undefined') return false;
	var c = t.replace('#', '.');
	$(this).closest('li').addClass('tabs active').siblings('li').removeClass('tabs active');
	if($(this).closest('div').find('.tabs-panel').length>0) $(this).closest('div').children('.tabs-panel').hide();
	else{ $(this).closest('div.inside').find('.tabs-panel, .hide_with_tabs').hide();
	if(t=='#html_settings'){$('#frm_html_tags_tab').click();}
	else if(t!='#frm-insert-fields' && t!='frm-html-tags'){$('#frm_insert_fields_tab').click();}
	}
	$(t).show();
	$(c).show();
	return false;
});

jQuery('.item-list-form').submit(function(){
if(jQuery('#bulkaction').val()=='delete'){return confirm('Are you sure you want to delete each of the selected items below?');}
});

jQuery('.frm_single_option').live("mouseenter mouseleave", function(evt){
if(evt.type=='mouseenter'){
jQuery(this).children(".frm_single_show_hover").show(); jQuery(this).children(".frm_single_visible_hover").css('visibility','visible');
}else{
jQuery(this).children(".frm_single_show_hover").hide(); jQuery(this).children(".frm_single_visible_hover").css('visibility','hidden');
}
});

jQuery('li.ui-state-default').live('click', function(evt){
	var target=evt.target;
	if($(this).hasClass('selected')) return;
	$('.frm-show-hover').css('visibility','hidden'); $(this).children('.frm-show-hover').css('visibility','visible');
	$('.frm-show-click').hide(); $(this).find('.frm-show-click').show();
	var i=$(this).find('input[name^="item_meta"], select[name^="item_meta"], textarea[name^="item_meta"]')[0];
	if($(i).val()) $(this).find('.frm_default_val_icons').show().css('visibility', 'visible');
	else $(this).find('.frm_default_val_icons').hide().css('visibility', 'hidden');
	$('li.ui-state-default.selected').removeClass('selected'); $(this).addClass('selected');
	if(!$(target).is('.inplace_field') && !$(target).is('.frm_ipe_field_label') && !$(target).is('.frm_ipe_field_desc') && !$(target).is('.frm_ipe_field_option') && !$(target).is('.frm_ipe_field_option_key')){ $('.inplace_field').blur();}
});

jQuery('select.frm_single_post_field').live('change', function(e){
jQuery('select.frm_single_post_field').removeAttr('style');
var t=$(this);var v=$(this).val();if(v=='') return false;
jQuery('select.frm_single_post_field').each(function(){
if($(this).val() == v && $(this).attr('name')!=t.attr('name')){
	$(this).css('border-color', 'red');t.val('');
	alert('Oops. You have already used that field.');return false;
}
});	
});

if($('#frm_tooltip').length==0){$('#wpfooter,#footer').prepend('<div id="frm_tooltip" class="frm_tooltip">&nbsp;</div>');}
$("img.frm_help[title], a.frm_help[title]").hover(
	function(){frm_title=$(this).attr('title');$(this).removeAttr('title');$('#frm_tooltip').html(frm_title).fadeIn();},
	function(){$('#frm_tooltip').fadeOut();$(this).attr('title',frm_title);}
);

$("select[name='frm_theme_selector'] option").each(function(){
$(this).hover(function(){$('#frm_show_cal').removeClass().addClass($(this).attr('id'));},'');
});

$("select[name='frm_theme_selector']").change(function(){
var css='https://ajax.googleapis.com/ajax/libs/jqueryui/1.7.3/themes/'+$(this).val()+'/jquery-ui.css';
frmUpdateCSS(css);
var themeName=$("select[name='frm_theme_selector'] option[value='"+$(this).val()+"']").text();
$('input[name="frm_theme_css"]').val($(this).val()); $('input[name="frm_theme_name"]').val(themeName);
return false;
});

jQuery('.field_type_list > li').draggable({connectToSortable:'#new_fields',cursor:'move',helper:'clone',revert:'invalid',delay:10});
jQuery('ul.field_type_list, .field_type_list li, ul.frm_code_list, .frm_code_list li, .frm_code_list li a, #frm_adv_info #category-tabs li, #frm_adv_info #category-tabs li a').disableSelection();

$('.frm_form_builder input[name^="item_meta"], .frm_form_builder textarea[name^="item_meta"]').live('keyup', function(){
var n=$(this).attr('name');
n=n.substring(10,n.length-1);
frmShowDefaults(n,jQuery(this).val());	
});
$('.frm_form_builder select[name^="item_meta"]').live('change', function(){
var n=$(this).attr('name');
n=n.substring(10,n.length-1);
frmShowDefaults(n,jQuery(this).val());	
});

jQuery('#frm_single_entry_type').change(function(){
if(jQuery('#frm_single_entry_type option:selected').val()=="cookie"){jQuery('#frm_cookie_expiration').fadeIn();}
else{jQuery('#frm_cookie_expiration').fadeOut();}
});

if($(".frm_exclude_cat_list .frm_catlevel_2").length>0){
$('.frm_exclude_cat_list').each(function(){
	var frm_lev=$(this).find('.frm_catlevel_2');
	if(frm_lev.length>0) $(this).find('.check_lev1_label, .check_lev2_label').show();
	var frm_lev=$(this).find('.frm_catlevel_3'); if(frm_lev.length>0) $(this).find('.check_lev3_label').show();
	var frm_lev=$(this).find('.frm_catlevel_4'); if(frm_lev.length>0) $(this).find('.check_lev4_label').show();
});
}


$('a.edit-frm_shortcode').click(function() {
	if ($('#frm_shortcodediv').is(":hidden")) {
		$('#frm_shortcodediv').slideDown('fast', function(){frmSetMenuOffset()});
		$(this).hide();
	}
	return false;
});

$('.cancel-frm_shortcode', '#frm_shortcodediv').click(function() {
	$('#frm_shortcodediv').slideUp('fast', function(){frmSetMenuOffset()});
	$('#frm_shortcodediv').siblings('a.edit-frm_shortcode').show();
	return false;
});
});

function frmUpdateOpts(field_id,ajax_url,opts){
	jQuery('#frm_field_'+field_id+'_opts').html('').addClass('frm-loading-img');
	jQuery.ajax({
		type:"POST",url:ajax_url,
		data:{action:'frm_import_options',field_id:field_id,opts:opts},
		success:function(html){jQuery('#frm_field_'+field_id+'_opts').html(html).removeClass('frm-loading-img');
		if(jQuery('select[name="item_meta['+field_id+']"]').length>0){
			var o=opts.replace(/\s\s*$/,'').split("\n");
			var sel='';
		    for (var i=0;i<o.length;i++){sel +='<option value="'+o[i]+'">'+o[i]+'</option>';}
		    jQuery('select[name="item_meta['+field_id+']"]').html(sel);
		}
		}
	});	
}

function frm_remove_tag(html_tag){jQuery(html_tag).remove();}

function frmToggleLogic(id){
$ele = jQuery('#'+id);
$ele.fadeOut('slow'); $ele.next('.frm_logic_rows').fadeIn('slow');
}
function frm_show_div(div,value,show_if,class_id){
if(value==show_if) jQuery(class_id+div).fadeIn('slow'); else jQuery(class_id+div).fadeOut('slow');
}
function frm_select_item_checkbox(checked){if(!checked){jQuery(".select-all-item-action-checkboxes").removeAttr("checked");}}

function frmCheckAll(checked,n){
if(checked){jQuery("input[name='"+n+"[]']").attr("checked","checked");}
else{jQuery("input[name='"+n+"[]']").removeAttr("checked");}
}

function frmCheckAllLevel(checked,n,level){
var $kids=jQuery(".frm_catlevel_"+level).children(".frm_checkbox").children('label');
if(checked){$kids.children("input[name='"+n+"[]']").attr("checked","checked");}
else{$kids.children("input[name='"+n+"[]']").removeAttr("checked");}	
}

function frmAddNewForm(form,action){if(form !='') window.location='?page=formidable&frm_action='+action+'&id='+form;}
function frmRedirectToForm(form,action){if(form !='') window.location='?page=formidable-entries&frm_action='+action+'&form='+form;}
function frmRedirectToDisplay(form,action){if(form !='') window.location='?page=formidable-entry-templates&frm_action='+action+'&form='+form;}

function frm_add_logic_row(id,ajax_url,form_id){
if(ajax_url=='' && typeof(__FRMURL)!='undefined') var ajax_url=__FRMURL; 
jQuery.ajax({
    type:"POST",url:ajax_url,
    data:"action=frm_add_logic_row&form_id="+form_id+"&field_id="+id+"&meta_name="+jQuery('#frm_logic_row_'+id+' > div').size(),
    success:function(html){jQuery('#frm_logic_row_'+id).append(html);}
});
}

function frmAddFormLogicRow(id,form_id){
if(typeof(__FRMURL)!='undefined') var ajax_url=__FRMURL;
if(jQuery('#frm_notification_'+id+' .frm_logic_row').length>0)
	var meta_name=1+parseInt(jQuery('#frm_notification_'+id+' .frm_logic_row:last').attr('id').replace('frm_logic_'+id+'_', ''));
else var meta_name=0;
jQuery.ajax({
    type:"POST",url:ajax_url,
    data:"action=frm_add_form_logic_row&form_id="+form_id+"&email_id="+id+"&meta_name="+meta_name,
    success:function(html){jQuery('#frm_logic_row_'+id).append(html);}
});
}

function frmGetFieldValues(field_id,current_field_id,row,ajax_url,name){
if(ajax_url=='' && typeof(__FRMURL)!='undefined') var ajax_url=__FRMURL; 
if(field_id){
    jQuery.ajax({
        type:"POST",url:ajax_url,
        data:"action=frm_get_field_values&current_field="+current_field_id+"&field_id="+field_id+'&name='+name,
        success:function(msg){jQuery("#frm_show_selected_values_"+current_field_id+'_'+row).html(msg);} 
    });
}
}

function add_frm_field_link(form_id, field_type){
if(typeof(__FRMURL)!='undefined') var ajax_url=__FRMURL; 
jQuery.ajax({type:"POST",url:ajax_url,data:"action=frm_insert_field&form_id="+form_id+"&field="+field_type,
success:function(msg){jQuery('#new_fields').append(msg); jQuery('#new_fields li:last .frm_ipe_field_label').click();}
});
};

function frm_duplicate_field(field_id){
if(typeof(__FRMURL)!='undefined') var ajax_url=__FRMURL;  
jQuery.ajax({type:"POST",url:ajax_url,data:"action=frm_duplicate_field&field_id="+field_id,
success:function(msg){jQuery('#new_fields').append(msg);}
});
};

function frm_mark_required(field_id,required){
	if(typeof(__FRMURL)!='undefined') var ajax_url=__FRMURL; 
    var thisid='req_field_'+field_id;
    if(required=='0'){var switch_to='1';var atitle='Click to Mark as Not Required';var checked='checked="checked"';
	jQuery('.frm_required_details'+field_id).fadeIn('slow');}
	else{var switch_to='0';var atitle='Click to Mark as Required';var checked='';
	jQuery('.frm_required_details'+field_id).fadeOut('slow');}
    jQuery('#'+thisid).replaceWith('<a href="javascript:frm_mark_required('+field_id+','+switch_to+')" class="frm_action_icon frm_required_icon alignleft frm_required'+switch_to+'" id="'+thisid+'" title="'+atitle+'"></a>');
	jQuery('#frm_'+thisid).replaceWith('<input type="checkbox" id="frm_'+thisid+'" name="field_options[required_'+field_id+']" value="1" '+checked+' onclick="frm_mark_required('+field_id+','+switch_to+')" />');
    jQuery.ajax({type:"POST",url:ajax_url,data:"action=frm_mark_required&field="+field_id+"&required="+switch_to});
};

function frmSeparateValue(field_id){
	if(typeof(__FRMURL)!='undefined') var ajax_url=__FRMURL;
	jQuery('.field_'+field_id+'_option_key').toggle();
	jQuery('.field_'+field_id+'_option').toggleClass('frm_with_key');
	jQuery.ajax({type:"POST",url:ajax_url,data:"action=frm_update_ajax_option&field="+field_id+"&separate_value=1"});
}

function frmShowDefaults(n,fval){
	if(fval){jQuery('#frm_clear_on_focus_'+n+',#frm_clear_on_focus_'+n+' a').css('visibility','visible').fadeIn('slow');}
	else{jQuery('#frm_clear_on_focus_'+n+',#frm_clear_on_focus_'+n+' a').css('visibility','visible').fadeOut('slow');}
}

function frm_clear_on_focus(field_id, active){
	if(typeof(__FRMURL)!='undefined') var ajax_url=__FRMURL; 
    var thisid='clear_field_'+field_id;
    if (active=='1'){var switch_to='0';var new_class='frm_inactive_icon';var t='Do not clear default value when field is clicked';}
    else{var switch_to='1';var new_class='';var t='Clear default value when field is clicked';}
    jQuery('#'+thisid).replaceWith('<a href="javascript:frm_clear_on_focus('+field_id+','+switch_to+')" class="'+new_class +' frm_action_icon frm_reload_icon" id="'+thisid+'" title="'+t+'"></a>');
    jQuery.ajax({type:"POST",url:ajax_url,data:"action=frm_update_ajax_option&field="+field_id+"&clear_on_focus="+switch_to});
};

function frm_default_blank(field_id,active){
	if(typeof(__FRMURL)!='undefined') var ajax_url=__FRMURL; 
    var thisid='default_blank_'+field_id;
    if(active=='1'){var switch_to='0';var new_class='frm_inactive_icon'; var t='Default value will pass form validation';}
	else{var switch_to='1';var new_class=''; var t='Default value will NOT pass form validation';}
    jQuery('#'+thisid).replaceWith('<a href="javascript:frm_default_blank('+field_id+','+switch_to+')" class="'+new_class+' frm_action_icon frm_error_icon" id="'+thisid+'" title="'+t+'"></a>');
    jQuery.ajax({type:"POST",url:ajax_url,data:"action=frm_update_ajax_option&field="+field_id+"&default_blank="+switch_to});
};

function frm_add_field_option(field_id,table){
	if(typeof(__FRMURL)!='undefined') var ajax_url=__FRMURL;
	var data = {action:'frm_add_field_option',field_id:field_id,t:table};
	jQuery.post(ajax_url,data,function(msg){
		jQuery('#frm_add_field_'+field_id).before(msg);
		if(table=='row'){ jQuery('#frm-grid-'+field_id+' tr:last').after(msg);}
	});
};

function frm_delete_field_option(field_id, opt_key){
	if(typeof(__FRMURL)!='undefined') var ajax_url=__FRMURL;
    jQuery.ajax({type:"POST",url:ajax_url,
        data:"action=frm_delete_field_option&field_id="+field_id+"&opt_key="+opt_key,
        success:function(msg){ jQuery('#frm_delete_field_'+field_id+'-'+opt_key+'_container').fadeOut("slow");}
    });
};

function frm_delete_field(field_id){ 
    if(confirm("Are you sure you want to delete this field and all data associated with it?")){
	if(typeof(__FRMURL)!='undefined') var ajax_url=__FRMURL;
    jQuery.ajax({
        type:"POST",url:ajax_url,
        data:"action=frm_delete_field&field_id="+field_id,
        success:function(msg){jQuery("#frm_field_id_"+field_id).fadeOut("slow");}
    });
    }
};

function frm_field_hover(show, field_id){
	var html_id = '#frm_field_id_'+field_id;
	if(show){jQuery(html_id).children('.frm-show-hover').css('visibility','visible');}
	else{if(!jQuery(html_id).is('.selected')){jQuery(html_id).children(".frm-show-hover").css('visibility','hidden');}}
}

function frmAddEmailList(form_id){
	if(typeof(__FRMURL)!='undefined') var ajax_url=__FRMURL;
	var len=jQuery('.frm_not_email_subject:last').attr('id').replace('email_subject_', '');
    jQuery.ajax({
        type:"POST",url:ajax_url,
        data:"action=frm_add_email_list&list_id="+(parseInt(len)+1)+"&form_id="+form_id,
        success:function(html){jQuery('#frm_email_add_button').before(html);jQuery('.notification_settings').fadeIn('slow');}
    });
}

function frmRemoveEmailList(id){
    jQuery('#frm_notification_'+id).fadeOut('slow').replaceWith('');
}

function frmCheckCustomEmail(value,id){
if(value=='custom'){jQuery('#cust_'+id).css('visibility','visible'); jQuery('#cust_'+id).parent('div').show();}
else{
jQuery('#cust_'+id).css('visibility','hidden');
if(id=='reply_to') var a='reply_to_name'; else var a='reply_to';
if(jQuery('#cust_'+a).css('visibility')=='hidden') jQuery('#frm_cust_reply_container').hide();	
}
}

function frmSetMenuOffset(){ 
	var fields = jQuery('#postbox-container-1 .frm_field_list');
	if(fields.length>0){
		var offset=283;
	}else{
		var fields = jQuery('#frm_adv_info');
		if(fields.length==0) return;
		var offset=455;
	}
	
	var currentOffset = document.documentElement.scrollTop || document.body.scrollTop; // body for Safari
	if(currentOffset == 0){ fields.removeAttr('style'); return;}
	if(jQuery('#frm_position_ele').length>0){ 
		var eleOffset=jQuery('#frm_position_ele').offset();
		var offset=eleOffset.top;
	}
	var desiredOffset = offset + 2 - currentOffset;
	if (desiredOffset < 35) desiredOffset = 35;
	//if (desiredOffset != parseInt(header.style.top)) 
		fields.attr('style', 'top:'+desiredOffset + 'px;');
}

function frmDisplayFormSelected(form_id, ajax_url){
    if (form_id == '') return;
    jQuery.ajax({type:"POST",url:ajax_url,
        data:"action=frm_get_cd_tags_box&form_id="+form_id,
        success:function(html){ jQuery('#frm_adv_info').html(html);}
    });
    jQuery.ajax({type:"POST",url:ajax_url,
        data:"action=frm_get_entry_select&form_id="+form_id,
        success:function(html){ jQuery('#entry_select_container').html(html);}
    });
    jQuery.ajax({type:"POST",url:ajax_url,
        data:"action=frm_get_date_field_select&form_id="+form_id,
        success:function(html){ jQuery('#date_field_id').html(html);}
    });
};

function frmInsertFieldCode(element,variable){
	if(typeof(element)=='object'){
		var element_id=element.closest('div').attr('class').split(' ')[1];
		if(element.hasClass('frm_noallow')) return;
	}else{var element_id=element;}

	if(!element_id) var rich=true;
	else var rich=jQuery('#wp-'+element_id+'-wrap.wp-editor-wrap').length > 0;
	variable='['+variable+']';
	if(rich){
		wpActiveEditor=element_id;
		send_to_editor(variable);
		return;
	}
	var content_box=jQuery('#'+element_id);
	if(content_box){
		if(content_box.hasClass('frm_not_email_to')) var variable=', '+variable;
		if(document.selection){content_box[0].focus();document.selection.createRange().text=variable;}
		else if(content_box[0].selectionStart){obj=content_box[0];var e=obj.selectionEnd;obj.value=obj.value.substr(0,obj.selectionStart)+variable+obj.value.substr(obj.selectionEnd,obj.value.length);
			var s=e+variable.length;obj.focus();obj.setSelectionRange(s,s);
		}
		else{content_box.val(variable+content_box.val());}
	}
}

function frmToggleAllowedShortcodes(id){
	if(typeof(id)=='undefined') var id='';
	var c=id;
	if(id !=='' && jQuery('#'+id).attr('class') && id !== 'wpbody-content' && id !== 'content' && id !== 'dyncontent' && id != 'success_msg'){
		var d=jQuery('#'+id).attr('class').split(' ')[0];
		if(d=='frm_long_input' || typeof(d)=='undefined') var d='';
		else var id=d;
		var c=c+' '+d;
	}
  	jQuery('#frm-insert-fields,#frm-conditionals,#frm-adv-info-tab,#frm-html-tags').removeClass().addClass('tabs-panel '+c);
  	var a=['content','wpbody-content','dyncontent','success_url','success_msg','edit_msg','frm_dyncontent','frm_not_email_message',
'frm_not_email_subject'];
  	var b=['before_content','after_content','frm_not_email_to','after_html','before_html','field_custom_html'];
  	if(jQuery.inArray(id, a) >= 0){
    	jQuery('.frm_code_list a').removeClass('frm_noallow').addClass('frm_allow');
		jQuery('.frm_code_list a.hide_'+id).addClass('frm_noallow').removeClass('frm_allow');
  	}else if(jQuery.inArray(id, b) >= 0){
    	jQuery('.frm_code_list a').not('.show_'+id).addClass('frm_noallow').removeClass('frm_allow');
    	jQuery('.frm_code_list a.show_'+id).removeClass('frm_noallow').addClass('frm_allow');
  	}else{
		jQuery('.frm_code_list a').addClass('frm_noallow').removeClass('frm_allow');
  	}
}

function frmToggleKeyID(switch_to){
	jQuery('.frm_code_list .frmids, .frm_code_list .frmkeys').hide();
	jQuery('.frm_code_list .'+switch_to).show();
	jQuery('.frmids, .frmkeys').removeClass('current');
	jQuery('.'+switch_to).addClass('current');
}

function frmGetFieldSelection(form_id,field_id,ajax_url){ 
    if(form_id){
    jQuery.ajax({type:"POST",url:ajax_url,
        data:"action=frm_get_field_selection&field_id="+field_id+"&form_id="+form_id,
        success:function(msg){ jQuery("#frm_show_selected_fields_"+field_id).html(msg);} 
    });
    }
};

function frmShowPostOpts(post_field,field_id){
    jQuery(".frm_custom_field_"+field_id+",.frm_exclude_cat_"+field_id).hide();
    if(post_field){
        if(post_field=='post_custom'){
            jQuery(".frm_custom_field_"+field_id).fadeIn('slow');
        }else if(post_field=='post_category'){
            jQuery(".frm_exclude_cat_"+field_id).fadeIn('slow');
            //get_cats to display
        }
        if(post_field!='') jQuery(".frm_post_title").fadeIn('slow');
    }
};

function frmSettingsTab(tab, id){
	var t = jQuery('.'+id+'_settings');
	if(jQuery(t).length==0)
		return false;
		
	tab.parent().addClass('active').siblings('li').removeClass('active');
	tab.closest('div.inside').children('.tabs-panel').hide();
	jQuery(t).show();
	return false;
}

//function to append a new theme stylesheet with the new style changes
function frmUpdateCSS(locStr){
	var cssLink = jQuery('<link href="'+locStr+'" type="text/css" rel="Stylesheet" class="ui-theme" />');
	jQuery("head").append(cssLink);
	
	if( jQuery("link.ui-theme").size() > 3){
		jQuery("link.ui-theme:first").remove();
	}	
}

function frmGetMetaValue(id, meta_name){
    if(jQuery('#'+id+meta_name).length>0) var new_meta=frmGetMetaValue(id,meta_name+1);
    else var new_meta=meta_name;
    return new_meta;
}