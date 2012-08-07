Wordpress on OpenShift
======================

This git repository helps you get up and running quickly w/ a Wordpress installation
on OpenShift.  The backend database is MySQL and the database name is the 
same as your application name (using $_ENV['OPENSHIFT_APP_NAME']).  You can name
your application whatever you want.  However, the name of the database will always
match the application so you might have to update .openshift/action_hooks/build.


Notes
=====

GIT_ROOT/.openshift/action_hooks/deploy:
    This script is executed with every 'git push'.  Feel free to modify this script
    to learn how to use it to your advantage.  By default, this script will create
    the database tables that this example uses.

    If you need to modify the schema, you could create a file 
    GIT_ROOT/.openshift/action_hooks/alter.sql and then use
    GIT_ROOT/.openshift/action_hooks/deploy to execute that script (make sure to
    back up your application + database w/ 'rhc app snapshot save' first :) )

Security Considerations
-----------------------
This repository contains configuration files with security related variables.

Since this is a shared repository, any applications derived from it will share those variables, thus reducing the security of your application.

You should follow the directions below and push your updated files to OpenShift immediately.

### Procedure

The following table lists files and the procedure for securing.

<table>
  <tr>
    <th>File</th>
    <th>Directions</th>
  </tr>
  <tr>
    <td>php/wp-config.php</td>
    <th>http://codex.wordpress.org/Editing_wp-config.php#Security_Keys</th>
  </tr>
</table>
